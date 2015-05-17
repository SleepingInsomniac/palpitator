require 'test_helper'

class AlbumsControllerTest < ActionController::TestCase
  setup do
    @album = albums(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:albums)
  end

  test "should create album" do
    assert_difference('Album.count') do
      post :create, album: { artist_id: @album.artist_id, title: @album.title, year: @album.year }
    end

    assert_response 201
  end

  test "should show album" do
    get :show, id: @album
    assert_response :success
  end

  test "should update album" do
    put :update, id: @album, album: { artist_id: @album.artist_id, title: @album.title, year: @album.year }
    assert_response 204
  end

  test "should destroy album" do
    assert_difference('Album.count', -1) do
      delete :destroy, id: @album
    end

    assert_response 204
  end
end
