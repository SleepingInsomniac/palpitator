json.array!(@songs) do |song|
  # json.extract! song, :id, :track, :title, :length, :album_id, :artist_id
  json.extract! song,
    :id,
    :track,
    :title,
    :length,
    :album_id,
    :play_count,
    :path,
    :digest,
    :extension,
    :created_at,
    :updated_at
  
  unless @album and @album.id == song.album_id
    @album = song.album
  end
  
  if @album
    json.album do
      json.extract! @album, :id, :title, :year
    end
  end
  
  unless @album and @artist and @artist.id == @album.artist_id
    @artist = @album.artist
  end
  
  if @artist
    json.artist do
      json.extract! @artist, :id, :name
    end
  end
  
  # json.url song_url(song, format: :json)
end
