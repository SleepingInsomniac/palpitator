class AlbumsController < ApplicationController
  before_action :set_base
  before_action :set_album, only: [:show, :update, :destroy]
  
  # GET /albums
  # GET /albums.json
  def index
    render json: @albums
  end
  
  # GET /albums/1
  # GET /albums/1.json
  def show
    render json: @album
  end
  
private

  def set_base
    if params[:artist_id].present?
      @albums = Artist.find(params[:artist_id]).albums
    else
      @albums = Album.all
    end
  end

  def set_album
    @album = @albums.find(params[:id])
  end

  def album_params
    params.require(:album).permit(:title, :year, :artist_id)
  end
end
