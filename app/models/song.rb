class Song < ActiveRecord::Base
  belongs_to :album
  has_one :artist, through: :album
  has_many :listings
  has_many :playlists, through: :listings
end
