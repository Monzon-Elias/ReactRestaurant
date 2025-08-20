import Shimmer from "../RestaurantCard/Shimmer.jsx";
import RestaurantHeader from "../RestaurantHeader/RestaurantHeader.jsx";
import TopPicks from "../TopPicks/TopPicks.jsx";
import RecommendedDishes from "../RecommendedDishes/RecommendedDishes.jsx";
import './RestaurantMenu.css';
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../../hooks/useRestaurantMenu";

const RestaurantMenu = () => {
    const {resId} = useParams();
    const { resInfo, topPicks, recommendedDishes } = useRestaurantMenu(resId);
    
    return resInfo === null ? <Shimmer /> : (
        <div className="restaurant-menu">
            <RestaurantHeader resInfo={resInfo} />
            <TopPicks topPicks={topPicks} recommendedDishes={recommendedDishes} />
            <RecommendedDishes recommendedDishes={recommendedDishes} />
        </div>
    );
};

export default RestaurantMenu;