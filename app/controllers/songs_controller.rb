class SongsController < ApplicationController
  
  before_action :set_base
  before_action :set_song, only: [:show, :update, :destroy, :play]

  def index
    render 'index.json'
  end

  def show
    render 'show.json'
  end
  
  def random
    @song = @songs.offset(rand(0..Song.count)).first
    render 'show.json'
  end
  
  def play

    # logger.info "----------------------------"
    # request.headers.each do |name, content|
    #   logger.info "#{name}: #{content}"
    # end
    # logger.info "----------------------------"
    
    file_begin = 0
    file_size = File.size(@song.path)
    file_end = file_size - 1

    if !request.headers["Range"]
      status_code = "200 OK"
    else
      status_code = "206 Partial Content"
      match = request.headers['Range'].match(/bytes=(\d+)-(\d*)/)
      if match
        file_begin = match[1]
        file_end = match[1] if match[2] && !match[2].empty?
      end
      response.header["Content-Range"] = "bytes " + file_begin.to_s + "-" + file_end.to_s + "/" + file_size.to_s
    end

    response.header["Content-Length"] = (file_end.to_i - file_begin.to_i + 1).to_s
    response.header["Last-Modified"] = @song.updated_at.to_s

    response.header["Cache-Control"] = "public, must-revalidate, max-age=0"
    response.header["Pragma"] = "no-cache"
    response.header["Accept-Ranges"] = "bytes"
    response.header["Content-Transfer-Encoding"] = "binary"
    
    if @song.length
      response.headers['Content-Duration'] = @song.length.to_s
      response.headers['X-Content-Duration'] = @song.length.to_s
    end
    
    send_file @song.path,
      :type => "audio/#{@song.extension.slice(1..10)}",
      :disposition => "inline",
      :status => status_code,
      :stream =>  'true',
      :buffer_size => 2048

    # logger.info "----------------------------"
    # response.headers.each do |name, content|
    #   logger.info "#{name}: #{content}"
    # end
    # logger.info "----------------------------"
    
  end
  
private
  
  def set_base
    if params[:album_id].present?
      @songs = Album.find(params[:album_id]).songs.includes(:artist)
    elsif params[:artist_id].present?
      @songs = Artist.find(params[:artist_id]).songs.includes(:album)
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
