class TripController < ApplicationController
    before_action :validate_vote_params, only: [:vote]

    # get 'api/trip/places'
    def list_places
        trip_places = TripService.list_places

        render json: trip_places
    end

    # post 'api/trip/vote'
    def vote
        vote_result = TripService.vote(permit_params)
        render json: vote_result
    end

    # get 'api/trip/ranking'
    def get_ranking
        ranking = TripService.get_ranking

        render json: ranking
    end


    private

    def permit_params
        params.permit(:name, :email, :votes)
    end

    def validate_vote_params
        person = Person.new(permit_params)
        if !person.valid?
          render :json => { error: person.errors }, :status => :bad_request and return
        end

    end
end
