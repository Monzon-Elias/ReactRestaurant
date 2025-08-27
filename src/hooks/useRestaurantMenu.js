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
            console.log('json data', json.data.cards);
            // Establecer resInfo (informacion del restaurante)
            if (json?.data?.cards?.[2]?.card?.card?.info) {
                setResInfo(json.data.cards[2].card.card.info);
            }
            
            // Top picks - usar la lógica que funcionaba
            if (json?.data?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
                const regularCards = json.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards;
                // Buscar top picks
                if (regularCards[1]?.card?.card?.carousel) {
                    const topPicksData = json.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards[1].card.card.carousel;
                    console.log('Top picks encontrados en carousel:', topPicksData);
                    setTopPicks(topPicksData);
                }
                if (regularCards[1]?.card?.card?.itemCards) {
                    const topPicksData = json.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards[1].card.card.itemCards;
                    console.log('Top picks encontrados en itemCards:', topPicksData);
                    setTopPicks(topPicksData);
                }
                
                // Buscar recommended dishes
                const recommendedCard = regularCards[3]?.card?.card?.itemCards || regularCards[2]?.card?.card?.itemCards;
                console.log('recommendedCards', recommendedCard);
                setRecommendedDishes(recommendedCard);
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return { resInfo, topPicks, recommendedDishes };
};

export default useRestaurantMenu;