require 'taglib'
require 'digest/md5'

class LibraryController < ApplicationController
  def update
    audio_root = APP_CONFIG['audio_root']
    Dir[File.join(audio_root, "**", "*")].reject { |d| File.directory? d }.each do |file|
      TagLib::FileRef.open(File.expand_path(file)) do |ref|
        tag = ref.tag
        
        artist = Artist.where(name: (tag.artist || "Untitled Artist")).first_or_create
        album = Album.where(artist: artist, title: (tag.album || "Untitled Album")).first_or_create
        
        digest = Digest::MD5.hexdigest File.read file
        song = Song.where(digest: digest).first_or_initialize
        song.update(track: tag.track, album: album, length: ref.audio_properties.length, title: (tag.title || "Untitled #{tag.track}"), path: File.expand_path(file))
        song.save
      end
    end
    render json: {notice: 'done'}
  end
  
end