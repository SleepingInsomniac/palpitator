class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.string :title, null: false, default: 'Untitled Album', index: true
      t.date :year
      t.belongs_to :artist, index: true, foreign_key: true
      
      t.timestamps null: false
    end
  end
end
