class SongsController < ApplicationController
  
  before_action :set_base
  before_action :set_song, only: [:show, :update, :destroy]

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
