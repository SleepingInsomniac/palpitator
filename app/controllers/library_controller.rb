class LibraryController < ApplicationController
  def update
    audio_root = APP_CONFIG['audio_root']
    unless File.exists? audio_root
      render json: {
        error: "Audio folder: `#{audio_root}` doesn't exist\nSet this in config/config.yml"
      }, status: 500 and return
    end
    
    Library.delay.update
    render json: "Update has been Queued"
  end
  
  def search
    term = params[:term] || ""
    term = "%#{term}%"
    
    @song_results   =   Song.where("title LIKE ?", term).limit(10)
    @artist_results = Artist.where("name LIKE ?", term).limit(10)
    @album_results  =  Album.where("title LIKE ?", term).limit(10)
    
    render json: {
      songs: @song_results,
      artists: @artist_results,
      albums: @album_results
    }
  end
  
end