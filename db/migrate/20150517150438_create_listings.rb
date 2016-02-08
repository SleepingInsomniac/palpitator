class CreateListings < ActiveRecord::Migration
  def change
    create_table :listings, id: false do |t|
      t.integer :order, null: false, default: 0
      t.belongs_to :playlist, foreign_key: true
      t.belongs_to :song, foreign_key: true
      
      t.timestamps null: false
    end
    add_index :listings, [:playlist_id, :song_id], unique: true
  end
end
