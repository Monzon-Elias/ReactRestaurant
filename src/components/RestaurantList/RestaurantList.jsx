import RestaurantCard from "../RestaurantCard/RestaurantCard.jsx";
import Shimmer from "../RestaurantCard/Shimmer.jsx";
import './RestaurantList.css';
import { Link } from "react-router-dom";
import useRestaurantList from "../../hooks/useRestaurantList";

const RestaurantList = ({restaurants, setRestaurants, setAllRestaurants}) => {
    const { loading, error } = useRestaurantList(setRestaurants, setAllRestaurants);

    if (error) return <p>Error: {error}</p>;

    return loading ? <Shimmer count={8}/> : (
        <div className="restaurant-list">
            {restaurants.map((restaurant) => (
                <Link key={restaurant.info.id} to={"/restaurant/"+restaurant.info.id}>
                    <RestaurantCard restaurant={restaurant} />
                </Link>
            ))}
        </div>
    )
}

export default RestaurantList;