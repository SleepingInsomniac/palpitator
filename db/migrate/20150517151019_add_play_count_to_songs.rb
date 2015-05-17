class AddPlayCountToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :play_count, :integer, null: false, default: 0
  end
end
