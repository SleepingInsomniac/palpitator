json.array!(@songs) do |song|
  json.extract! song, :id, :track, :title, :length, :album_id, :artist_id
  json.url song_url(song, format: :json)
end
