import {CDN_URL} from '../../utils/constants';
import './RestaurantCard.css';
const RestaurantCard = ({restaurant}) => {
    const { name, cuisines, avgRating, cloudinaryImageId, costForTwo, sla} = restaurant.info;
    const { slaString } = sla;
        return (
        <div className="restaurant-card">
            <img src={CDN_URL + cloudinaryImageId} alt={name}/>
            <div className="restaurant-details">
                <h2 className="restaurant-name">{name}</h2>
                <div className="cuisine-section">
                    <span className="icon">🍽️</span>
                    <p className="cuisines">{cuisines.join(', ')}</p>
                </div>
                <div className="cost-section">
                    <span className="icon">💰</span>
                    <p className="cost">{costForTwo}</p>
                </div>
                <div className="delivery-section">
                    <span className="icon">⏰</span>
                    <p className="delivery">{slaString}</p>
                </div>
                <div className="rating-section">
                    <span className="icon">⭐</span>
                    <p className="rating">{avgRating}</p>
                </div>
            </div>
        </div>
    );
}
export default RestaurantCard;