require "rails_helper"

RSpec.describe TripController, :type => :controller do
  describe "GET #ranking" do
    it "responds successfully with an HTTP 200 status code" do
      get :get_ranking
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end

    it "should have parameter succeeded equals true" do
      get :get_ranking

      isSucceeded = JSON.parse(response.body)["succeeded"]
      expect(isSucceeded).to be true
    end
  end

  describe "GET #list_places" do
    it "responds successfully with an HTTP 200 status code" do
      get :get_ranking
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end

    it "should have parameter succeeded equals true" do
      get :get_ranking

      isSucceeded = JSON.parse(response.body)["succeeded"]
      expect(isSucceeded).to be true
    end
  end

  describe "POST #vote" do
    it "should validate empty requests" do
      post :vote

      expect(response).to have_http_status(400)
      message = JSON.parse(response.body)["message"]
      expect(message).to eq("Missing params")
    end
  end

end