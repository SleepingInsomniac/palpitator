json.array!(@listings) do |listing|
  json.extract! listing, :id, :order, :playlist_id, :song_id
  json.url listing_url(listing, format: :json)
end
