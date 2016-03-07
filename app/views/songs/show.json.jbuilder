json.extract! @song, :id, :track, :title, :length, :album_id, :digest, :play_count, :extension

json.created_at @song.created_at.to_f * 1000 # convert to miliseconds
json.updated_at @song.updated_at.to_f * 1000 # convert to miliseconds

json.artist do
  json.extract! @song.artist, :id, :name
end
json.album do
  json.extract! @song.album, :id, :title
end
