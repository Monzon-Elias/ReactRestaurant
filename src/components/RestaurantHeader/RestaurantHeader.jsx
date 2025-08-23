import { CDN_URL } from "../../utils/constants";
import './RestaurantHeader.css';

const RestaurantHeader = ({ resInfo }) => {
    if (!resInfo) return null;

    return (
        <div className="restaurant-header">
            <div className="restaurant-info">
                <div className="restaurant-main">
                    {resInfo?.cloudinaryImageId && (
                        <img 
                            src={`${CDN_URL}/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${resInfo?.cloudinaryImageId}`}
                            alt={resInfo?.name}
                            className="restaurant-image"
                        />
                    )}
                    <div className="restaurant-details">
                        <h1 className="restaurant-name">{resInfo?.name}</h1>
                        <div className="restaurant-meta">
                            <span className="cuisines">🍽️ {resInfo?.cuisines?.join(', ')}</span>
                            <span className="location">📍 {resInfo?.locality}, {resInfo?.city}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="restaurant-stats">
                <div className="rating-section">
                    <div className="rating">
                        <span className="rating-number">{resInfo?.avgRatingString}</span>
                        <span className="rating-star">⭐</span>
                    </div>
                    <span className="total-ratings">{resInfo?.totalRatingsString}</span>
                </div>
                
                <div className="delivery-info">
                    <span className="delivery-time">🕒 {resInfo?.sla?.slaString}</span>
                    <span className="cost-for-two">💰 {resInfo?.costForTwoMessage}</span>
                </div>
            </div>
        </div>
    );
};

export default RestaurantHeader;



