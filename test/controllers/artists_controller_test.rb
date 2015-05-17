require 'test_helper'

class ArtistsControllerTest < ActionController::TestCase
  setup do
    @artist = artists(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:artists)
  end

  test "should create artist" do
    assert_difference('Artist.count') do
      post :create, artist: { name: @artist.name }
    end

    assert_response 201
  end

  test "should show artist" do
    get :show, id: @artist
    assert_response :success
  end

  test "should update artist" do
    put :update, id: @artist, artist: { name: @artist.name }
    assert_response 204
  end

  test "should destroy artist" do
    assert_difference('Artist.count', -1) do
      delete :destroy, id: @artist
    end

    assert_response 204
  end
end
