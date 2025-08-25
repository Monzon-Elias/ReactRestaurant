import RestaurantCard from "../RestaurantCard/RestaurantCard.jsx";
import Shimmer from "../RestaurantCard/Shimmer.jsx";
import './RestaurantList.css';
import { Link } from "react-router-dom";
import useRestaurantList from "../../hooks/useRestaurantList";
import withPromotedLabel from "../withPromotedLabel/withPromotedLabel.jsx";

const RestaurantList = ({restaurants, setRestaurants, setAllRestaurants}) => {
    const { loading, error } = useRestaurantList(setRestaurants, setAllRestaurants);
    const PromotedRestaurant = withPromotedLabel(RestaurantCard);

    if (error) return <p>Error: {error}</p>;

    return loading ? <Shimmer count={8}/> : (
        <div className="restaurant-list">
            {restaurants.map((restaurant) => (
                restaurant.info.promoted ? 
                <Link key={restaurant.info.id} to={"/restaurant/"+restaurant.info.id}>
                    <PromotedRestaurant restaurant={restaurant} />
                </Link> :
                <Link key={restaurant.info.id} to={"/restaurant/"+restaurant.info.id}>
                    <RestaurantCard key={restaurant.info.id} restaurant={restaurant} />
                </Link>
            ))}
        </div>
    )
}

export default RestaurantList;