# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150529021022) do

  create_table "albums", force: :cascade do |t|
    t.string   "title",      default: "Untitled Album", null: false
    t.date     "year"
    t.integer  "artist_id"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
  end

  add_index "albums", ["artist_id"], name: "index_albums_on_artist_id"
  add_index "albums", ["title"], name: "index_albums_on_title"

  create_table "artists", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "artists", ["name"], name: "index_artists_on_name"

  create_table "listings", id: false, force: :cascade do |t|
    t.integer  "order",       default: 0, null: false
    t.integer  "playlist_id"
    t.integer  "song_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "listings", ["playlist_id", "song_id"], name: "index_listings_on_playlist_id_and_song_id", unique: true

  create_table "playlists", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "songs", force: :cascade do |t|
    t.integer  "track"
    t.string   "title",      default: "Untitled Song", null: false
    t.integer  "length"
    t.integer  "album_id"
    t.string   "path"
    t.string   "digest"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.integer  "play_count", default: 0,               null: false
    t.string   "extension"
  end

  add_index "songs", ["album_id"], name: "index_songs_on_album_id"
  add_index "songs", ["digest"], name: "index_songs_on_digest"

end
