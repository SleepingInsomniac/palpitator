class SongsController < ApplicationController
  
  before_action :set_base
  before_action :set_song, only: [:show, :update, :destroy, :play]

  def index
    render json: @songs
  end

  def show
    render json: @song
  end
  
  def random
    @song = @songs.where("id >= ?", rand(0..Song.count)).first
    render json: @song
  end
  
  def play
    
    file_begin = 0
    file_size = File.size(@song.path)
    file_end = file_size - 1

    if !request.headers["Range"]
      status_code = 200 # "200 OK"
    else
      status_code = 206 # "206 Partial Content"
      match = request.headers['range'].match(/bytes=(\d+)-(\d*)/)
      if match
        file_begin = match[1]
        file_end = match[1] if match[2] && !match[2].empty?
      end
      response.header["Content-Range"] = "bytes " + file_begin.to_s + "-" + file_end.to_s + "/" + file_size.to_s
    end

    # response.header["Content-Length"] = (file_end.to_i - file_begin.to_i + 1).to_s
    response.header['Content-Length'] = file_size.to_s
    response.header["Last-Modified"] = @song.updated_at.to_s

    response.header["Cache-Control"] = "public, must-revalidate, max-age=0"
    response.header["Pragma"] = "no-cache"
    response.header["Accept-Ranges"] = "bytes"
    response.header["Content-Transfer-Encoding"] = "binary"
    
    send_file(@song.path, 
      :type => "audio/#{@song.extension.slice(1..10)}",
      :disposition => "inline",
      :status => status_code,
      :stream =>  'true',
      :buffer_size  =>  2048)
    
  end
  
private
  
  def set_base
    if params[:album_id].present?
      @songs = Album.find(params[:album_id]).songs
    elsif params[:artist_id].present?
      @songs = Artist.find(params[:artist_id]).songs
    else
      @songs = Song.all
    end
  end
  
  def set_song
    @song = @songs.find(params[:id])
  end

  def song_params
    params.require(:song).permit(:track, :title, :length, :album_id, :artist_id)
  end
  
end
