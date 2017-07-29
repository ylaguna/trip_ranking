# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

trip_place_list =
[
    {
        name: "Paris",
        photo_url: "http://www.parisaddress.com/var/source/district/new/tour_eiffel-paris.jpg"
    },
    {
        name: "Las Vegas",
        photo_url: "https://cdn.gobankingrates.com/wp-content/uploads/2017/03/0-Main-LasVegasSecrets-f11photo-shutterstock_497449417-1024x576.jpg"
    },
    {
        name: "Cancun",
        photo_url: "http://www.beach-backgrounds.com/wallpapers/fascinating-view-over-the-beach-in-cancun-mexico-wallpaper-1024x576-589.jpg"
    },
    {
        name: "Bariloche",
        photo_url: "https://cache-graphicslib.viator.com/graphicslib/thumbs674x446/5239/SITours/half-day-small-circuit-tour-mt-campanario-and-llao-llao-peninsula-in-bariloche-248751.jpg"
    },
    {
        name: "Egito",
        photo_url: "http://www.potenciaturismo.com.br/wp-content/uploads/2015/01/ancient-egypt-pyramids-wallpaper3-1024x576.jpg"
    }
]

trip_place_list.each do |trip_place|
    model = TripPlace.find_or_initialize_by(name: trip_place[:name])
    model.photo_url = trip_place[:photo_url]
    model.save
end