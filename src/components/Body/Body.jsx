import SearchBar from "../SearchBar/SearchBar.jsx";
import RestaurantList from "../RestaurantList/RestaurantList.jsx";
import './Body.css';
import {useState} from "react";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import Offline from "../../Snippets/Offline";

const Body = () => {
    const [allRestaurants, setAllRestaurants] = useState([]); // original
    const [restaurants, setRestaurants] = useState([]);       // filtrada
    const onlineStatus = useOnlineStatus();
    if (onlineStatus === false) return (
        <Offline />
    );
    
    return (
        <div className="body">
            <SearchBar
                setRestaurants={setRestaurants}
                allRestaurants={allRestaurants}
            />
            <RestaurantList
                restaurants={restaurants}
                setRestaurants={setRestaurants}
                setAllRestaurants={setAllRestaurants}
            />
        </div>
    );
};
export default Body;