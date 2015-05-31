json.extract! @song, :id, :track, :title, :length, :album_id, :path, :digest, :play_count, :extension, :created_at, :updated_at
json.artist do
  json.extract! @song.artist, :id, :name
end
json.album do
  json.extract! @song.album, :id, :title
end
