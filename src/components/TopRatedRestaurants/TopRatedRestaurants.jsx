import './TopRatedRestaurants.css';

const TopRatedRestaurants = ({setRestaurants, allRestaurants}) => {

    return (
        <button className="top-rated-restaurants"
                onClick={() => {
                    let filteredRestaurants = allRestaurants.filter(restaurant => restaurant.info.avgRating >= 4.5)
                        .sort((a, b) => b.info.avgRating - a.info.avgRating)
                    
                    // If no restaurants found with 4.5+ rating, lower threshold to 4.0
                    if (filteredRestaurants.length === 0) {
                        filteredRestaurants = allRestaurants.filter(restaurant => restaurant.info.avgRating >= 4.0)
                            .sort((a, b) => b.info.avgRating - a.info.avgRating)
                    }
                    console.log('top related restaurants:', filteredRestaurants);
                    setRestaurants(filteredRestaurants)
                }}>
            Top Rated Restaurants
        </button>
    );
}

export default TopRatedRestaurants;