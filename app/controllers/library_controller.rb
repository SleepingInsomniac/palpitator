require 'taglib'
require 'digest/md5'

class LibraryController < ApplicationController
  def update
    audio_root = APP_CONFIG['audio_root']
    Dir[File.join(audio_root, "**", "*")].reject { |d| File.directory? d }.each do |file|
      TagLib::FileRef.open(File.expand_path(file)) do |ref|
        tag = ref.tag
        
        artist = Artist.where(name: (tag.artist || "Untitled Artist").titleize).first_or_create
        album = Album.where(artist: artist, title: (tag.album || "Untitled Album")).first_or_create
        
        digest = Digest::MD5.hexdigest File.read file
        song = Song.where(digest: digest).first_or_initialize
        song.update(
          track: tag.track,
          album: album,
          length: ref.audio_properties.length,
          title: (tag.title || "Untitled #{tag.track}"),
          path: File.expand_path(file),
          extension: File.extname(file) # maybe check for real if you accept uploaded files
        )
        song.save
      end
    end
    render json: {notice: 'done'}
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