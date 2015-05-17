class ListingsController < ApplicationController
  before_action :set_listing, only: [:show, :update, :destroy]

  # GET /listings
  # GET /listings.json
  def index
    @listings = Listing.all

    render json: @listings
  end

  # GET /listings/1
  # GET /listings/1.json
  def show
    render json: @listing
  end

  # POST /listings
  # POST /listings.json
  def create
    @listing = Listing.new(listing_params)

    if @listing.save
      render json: @listing, status: :created, location: @listing
    else
      render json: @listing.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /listings/1
  # PATCH/PUT /listings/1.json
  def update
    @listing = Listing.find(params[:id])

    if @listing.update(listing_params)
      head :no_content
    else
      render json: @listing.errors, status: :unprocessable_entity
    end
  end

  # DELETE /listings/1
  # DELETE /listings/1.json
  def destroy
    @listing.destroy

    head :no_content
  end

  private

    def set_listing
      @listing = Listing.find(params[:id])
    end

    def listing_params
      params.require(:listing).permit(:order, :playlist_id, :song_id)
    end
end
