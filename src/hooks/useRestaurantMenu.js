import { useEffect, useState } from "react";
import { MENU_URL } from "../utils/constants";

const useRestaurantMenu = resId => {
    const [resInfo, setResInfo] = useState(null);
    const [topPicks, setTopPicks] = useState(null);
    const [recommendedDishes, setRecommendedDishes] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await fetch(MENU_URL+resId);
            const json = await data.json();
            
            // Establecer resInfo (esto funciona)
            if (json?.data?.cards?.[2]?.card?.card?.info) {
                setResInfo(json.data.cards[2].card.card.info);
            }
            
            // Top picks - usar la lógica que funcionaba
            if (json?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
                const regularCards = json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards;
                
                // Buscar top picks en la posición que funcionaba
                if (regularCards[1]?.card?.card?.carousel?.[0]?.dish?.info?.addons?.[0]?.choices) {
                    const topPicksData = regularCards[1].card.card.carousel[0].dish.info.addons[0].choices;
                    console.log('Top picks encontrados:', topPicksData);
                    setTopPicks(topPicksData);
                }
                
                // Buscar recommended dishes
                const recommendedCard = regularCards.find(card => 
                    card?.card?.card?.title?.toLowerCase().includes('recommended')
                );
                
                if (recommendedCard?.card?.card?.itemCards) {
                    setRecommendedDishes(recommendedCard.card.card.itemCards);
                }
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return { resInfo, topPicks, recommendedDishes };
};

export default useRestaurantMenu;