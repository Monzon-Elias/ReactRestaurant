import {useEffect, useState} from "react";
import {fetchRestaurants} from "../Snippets/fetchRestaurants.js";

const useRestaurantList = (setRestaurants, setAllRestaurants) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                let data = await fetchRestaurants();
                
                // Try different possible paths for the restaurants data
                let restaurants = null;
                
                // Path 1: Original path
                if (data?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
                    restaurants = data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants;
                }
                // Path 2: Alternative path (common in mobile)
                else if (data?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
                    restaurants = data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants;
                }
                // Path 3: Look through all cards for restaurants
                else if (data?.data?.cards) {
                    for (let i = 0; i < data.data.cards.length; i++) {
                        const card = data.data.cards[i];
                        if (card?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
                            restaurants = card.card.card.gridElements.infoWithStyle.restaurants;
                            break;
                        }
                    }
                }
                
                // If still no restaurants found, try to find any array that might contain restaurant data
                if (!restaurants && data?.data?.cards) {
                    for (let i = 0; i < data.data.cards.length; i++) {
                        const card = data.data.cards[i];
                        if (Array.isArray(card?.card?.card?.restaurants)) {
                            restaurants = card.card.card.restaurants;
                            break;
                        }
                    }
                }
                
                if (!restaurants) {
                    throw new Error('No restaurants data found in API response');
                }
                
                setRestaurants(restaurants);
                setAllRestaurants(restaurants);
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