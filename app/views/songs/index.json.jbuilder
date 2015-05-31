json.array!(@songs) do |song|
  # json.extract! song, :id, :track, :title, :length, :album_id, :artist_id
  json.extract! song, :id, :track, :title, :length, :album_id, :path, :digest, :play_count, :extension, :created_at, :updated_at
  
  # json.url song_url(song, format: :json)
end
