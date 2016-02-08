class Playlist < ActiveRecord::Base
  has_many :listings
  has_many :songs, through: :listings
end
