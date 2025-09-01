import { CDN_URL } from "../../utils/constants";
import './TopPicks.css';
import useAddItemToCart from "../../hooks/useAddItemToCart";

const TopPicks = ({ topPicks }) => {
    // Si no hay topPicks, no mostrar nada
    if (!topPicks || topPicks.length === 0) {
        return null;
    }
    const handleAddItem = useAddItemToCart();
    return (
        <div className="top-picks-section">
            <h2>🍽️ Top Picks</h2>
            <div className="top-picks-grid">
                {topPicks.map((pick, index) => (
                    <div key={index} className="top-pick-item">
                        <div className="pick-image-section">
                            {(pick.dish?.info?.imageId || pick.card?.info?.imageId) ? (
                                <img 
                                    src={`${CDN_URL}/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${pick.dish?.info?.imageId || pick.card?.info?.imageId}`}
                                    alt={pick.dish?.info?.name || pick.card?.info?.name}
                                    className="pick-image"
                                />
                            ) : (
                                <div className="pick-image-placeholder fallback">
                                    <span className="placeholder-icon">🍜</span>
                                    <span className="placeholder-text">Foto no disponible</span>
                                </div>
                            )}
                        </div>
                        <div className="pick-content">
                            <div className="pick-info">
                                <div className="pick-header">
                                    <div className="pick-title-section">
                                        <div className="vegetarian-indicator">
                                            <div className="veg-icon"></div>
                                        </div>
                                        <h3>{pick.dish?.info?.name || pick.card?.info?.name}</h3>
                                    </div>
                                    <span className="pick-price">₹{(pick.dish?.info?.price || pick.card?.info?.price || pick.dish?.info?.defaultPrice || pick.card?.info?.defaultPrice || 0) / 100}</span>
                                </div>
                            </div>
                            <button className="add-button" onClick={() => handleAddItem(pick)}>ADD</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopPicks;

