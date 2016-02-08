class ArtistsController < ApplicationController
  before_action :set_artist, only: [:show, :update, :destroy]

  def index
    @artists = Artist.all
    render json: @artists
  end

  def show
    render json: @artist
  end
  
  private

    def set_artist
      @artist = Artist.find(params[:id])
    end

    def artist_params
      params.require(:artist).permit(:name)
    end
end
