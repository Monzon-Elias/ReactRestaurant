import { useEffect, useState } from "react";
import { MENU_URL } from "../utils/constants";

const useRestaurantMenu = resId => {
    const [resInfo, setResInfo] = useState(null);
    const [topPicks, setTopPicks] = useState(null);
    const [recommendedDishes, setRecommendedDishes] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const extractTopPicks = (regularCards) => {
        if (regularCards[1]?.card?.card?.carousel) {
            return regularCards[1].card.card.carousel;
        }
        if (regularCards[1]?.card?.card?.itemCards) {
            return regularCards[1].card.card.itemCards;
        }
        return null;
    };

    const extractRecommendedDishes = (regularCards) => {
        return regularCards[3]?.card?.card?.itemCards || regularCards[2]?.card?.card?.itemCards;
    };

    const fetchData = async () => {
        try {
            const data = await fetch(MENU_URL+resId);
            const json = await data.json();
            console.log('json data', json.data.cards);
            
            // Establecer resInfo (informacion del restaurante)
            if (json?.data?.cards?.[2]?.card?.card?.info) {
                setResInfo(json.data.cards[2].card.card.info);
            }
            
            if (json?.data?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
                const regularCards = json.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards;
                
                const topPicksData = extractTopPicks(regularCards);
                if (topPicksData) {
                    console.log('Top picks encontrados:', topPicksData);
                    setTopPicks(topPicksData);
                }
                
                const recommendedData = extractRecommendedDishes(regularCards);
                if (recommendedData) {
                    console.log('recommendedCards', recommendedData);
                    setRecommendedDishes(recommendedData);
                }

            } else if (json?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
                const regularCards = json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards;
                
                const topPicksData = extractTopPicks(regularCards);
                if (topPicksData) {
                    console.log('Top picks encontrados:', topPicksData);
                    setTopPicks(topPicksData);
                }

                const recommendedData = extractRecommendedDishes(regularCards);
                if (recommendedData) {
                    console.log('recommendedCards', recommendedData);
                    setRecommendedDishes(recommendedData);
                }
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return { resInfo, topPicks, recommendedDishes };
};

export default useRestaurantMenu;