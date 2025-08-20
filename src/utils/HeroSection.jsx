const HeroSection = () => {
    return (
        <div className="hero-section">
        <div className="hero-content">
            <h1 className="hero-title">Discover Amazing Restaurants</h1>
            <p className="hero-subtitle">Find the best dining experiences in your area</p>
            <div className="hero-features">
                <div className="feature">
                    <span className="feature-icon">🍽️</span>
                    <span>Top Rated</span>
                </div>
                <div className="feature">
                    <span className="feature-icon">🔍</span>
                    <span>Easy Search</span>
                </div>
                <div className="feature">
                    <span className="feature-icon">⭐</span>
                    <span>Best Quality</span>
                </div>
            </div>
        </div>
    </div>
    )
}
export default HeroSection;