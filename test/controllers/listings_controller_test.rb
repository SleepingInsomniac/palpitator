require 'test_helper'

class ListingsControllerTest < ActionController::TestCase
  setup do
    @listing = listings(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:listings)
  end

  test "should create listing" do
    assert_difference('Listing.count') do
      post :create, listing: { order: @listing.order, playlist_id: @listing.playlist_id, song_id: @listing.song_id }
    end

    assert_response 201
  end

  test "should show listing" do
    get :show, id: @listing
    assert_response :success
  end

  test "should update listing" do
    put :update, id: @listing, listing: { order: @listing.order, playlist_id: @listing.playlist_id, song_id: @listing.song_id }
    assert_response 204
  end

  test "should destroy listing" do
    assert_difference('Listing.count', -1) do
      delete :destroy, id: @listing
    end

    assert_response 204
  end
end
