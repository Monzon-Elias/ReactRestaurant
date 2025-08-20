import { CDN_URL } from "../../utils/constants";
import './TopPicks.css';

const TopPicks = ({ topPicks, recommendedDishes }) => {
    const getFakeTopPicks = (recommendedDishes) => {
        if (!recommendedDishes || recommendedDishes.length === 0) return [];
        
        // Tomar hasta 3 platos aleatorios de recommended dishes
        const shuffled = [...recommendedDishes].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3).map(dish => ({
            ...dish,
            isFake: true, // Marcar como fake
            fakePrice: Math.floor(Math.random() * (400 - 150 + 1)) + 150
        }));
    };

    // Si no hay topPicks, generar fake ones
    if (!topPicks || topPicks.length === 0) {
        const fakeTopPicks = getFakeTopPicks(recommendedDishes);
        
        if (fakeTopPicks.length === 0) {
            return <p>No hay top picks disponibles</p>;
        }

        return (
            <div className="top-picks-section">
                <h2>🍽️ Top Picks *</h2>
                <div className="top-picks-grid">
                    {fakeTopPicks.map((fakePick, index) => (
                        <div key={`fake-${index}`} className="top-pick-item">
                            <div className="pick-image-section">
                                {fakePick.card?.info?.imageId ? (
                                    <img 
                                        src={`${CDN_URL}/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${fakePick.card.info.imageId}`}
                                        alt={fakePick.card.info.name}
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
                                            <h3>{fakePick.card.info.name} *</h3>
                                        </div>
                                        <span className="pick-price">₹{fakePick.fakePrice}</span>
                                    </div>
                                </div>
                                <button className="add-button">ADD</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="top-picks-section">
            <h2>🍽️ Top Picks</h2>
            <div className="top-picks-grid">
                {topPicks.map((pick, index) => (
                    <div key={index} className="top-pick-item">
                        <div className="pick-image-section">
                            {pick.imageId ? (
                                <img 
                                    src={`${CDN_URL}/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${pick.imageId}`}
                                    alt={pick.name}
                                    className="pick-image"
                                />
                            ) : recommendedDishes && recommendedDishes.length > 0 ? (
                                // Usar imagen rotativa de recommended dishes
                                <img 
                                    src={`${CDN_URL}/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${recommendedDishes[index % recommendedDishes.length]?.card?.info?.imageId}`}
                                    alt={pick.name}
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
                                        <h3>{pick.name}</h3>
                                    </div>
                                    <span className="pick-price">₹{(pick.price || 0) / 100}</span>
                                </div>
                                <p className="pick-description">{pick.description}</p>
                            </div>
                            <button className="add-button">ADD</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopPicks;

