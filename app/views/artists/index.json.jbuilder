json.array!(@artists) do |artist|
  json.extract! artist, :id, :name
  json.url artist_url(artist, format: :json)
end
