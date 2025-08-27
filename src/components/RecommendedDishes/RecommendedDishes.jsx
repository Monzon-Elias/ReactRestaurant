import { CDN_URL } from "../../utils/constants";
import './RecommendedDishes.css';

const RecommendedDishes = ({ recommendedDishes }) => {
    if (!recommendedDishes || recommendedDishes.length === 0) {
        return null;
    }

    return (
        <div className="recommended-dishes-section">
            <h2>⭐ Recommended Dishes</h2>
            <div className="recommended-dishes-grid">
                {recommendedDishes.map((dish, index) => (
                    <div key={index} className="recommended-dish-item">
                        <div className="dish-content">
                            <div className="dish-info">
                                <div className="dish-header">
                                    <h3>{dish.card.info.name}</h3>
                                    <span className="dish-price">
                                        ₹{(dish.card.info?.price || dish.card.info?.defaultPrice || 0) / 100}
                                    </span>
                                </div>
                                <p className="dish-description">{dish.card.info.description || dish.card.info.category}</p>
                                {dish.card.info.ratings?.aggregatedRating?.rating && (
                                    <div className="dish-rating">
                                        <span className="rating-star">⭐</span>
                                        <span className="rating-text">{dish.card.info.ratings.aggregatedRating.rating}</span>
                                    </div>
                                )}
                            </div>
                            <div className="dish-image-section">
                                {dish.card.info.imageId ? (
                                    <img 
                                        src={`${CDN_URL}/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${dish.card.info.imageId}`}
                                        alt={dish.card.info.name}
                                        className="dish-image"
                                    />
                                ) : <div className="pick-image-placeholder fallback">
                                <span className="placeholder-icon">🍜</span>
                                <span className="placeholder-text">Foto no disponible</span>
                            </div>}
                                <button className="add-button">ADD</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedDishes;

