class TripController < ApplicationController
    before_action :validate_vote_params, only: [:vote]

    # get 'api/trip/places'
    def list_places
        trip_places = TripService.list_places

        render json: trip_places
    end

    # post 'api/trip/vote'
    def vote
        vote_result = TripService.vote(person_params)
        render json: vote_result
    end

    # get 'api/trip/ranking'
    def get_ranking
        ranking = TripService.get_ranking

        render json: ranking
    end


    private

    def person_params
       params.slice(:name, :email, :votes)
    end

    def validate_vote_params
        errors = []
        errors << "Missing params" if person_params[:name].blank? || person_params[:email].blank? || person_params[:votes].blank?
        render :json => { status: "Error", message: errors }, :status => :bad_request and return if errors.present?
    end
end
