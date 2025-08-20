import {useEffect, useState} from "react";
import {fetchRestaurants} from "../Snippets/fetchRestaurants.js";

const useRestaurantList = (setRestaurants, setAllRestaurants) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                let data = await fetchRestaurants();
                data = data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
                setRestaurants(data);
                setAllRestaurants(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { loading, error };
};

export default useRestaurantList;