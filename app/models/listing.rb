class Listing < ActiveRecord::Base
  belongs_to :playlist
  belongs_to :song
end
