class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.integer :track
      t.string :title, null: false, default: "Untitled Song"
      t.integer :length
      t.belongs_to :album, index: true, foreign_key: true
      t.string :path
      t.string :digest, index: true
      
      t.timestamps null: false
    end
  end
end
