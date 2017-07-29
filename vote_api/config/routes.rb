Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  scope '/api' do


      get '/trip/places', to: 'trip#list_places'
      post '/trip/vote', to: 'trip#vote'
      get '/trip/ranking', to: 'trip#get_ranking'


  end


end
