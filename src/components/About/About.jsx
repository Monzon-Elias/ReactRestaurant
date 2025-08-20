import './About.css';

const About = () => {
    return (
        <div className="app">
            <div className="about-page">
                <div className="about-container">
                    <h1 className="about-title">About Restaurant App</h1>
                    
                    <div className="about-content">
                        <div className="about-section">
                            <h2>Our Mission</h2>
                            <p>
                                We connect food lovers with the best restaurants in their area. 
                                Our platform makes it easy to discover new dining experiences, 
                                find top-rated establishments, and explore diverse cuisines.
                            </p>
                        </div>
                        
                        <div className="about-section">
                            <h2>What We Offer</h2>
                            <ul>
                                <li>Comprehensive restaurant listings</li>
                                <li>Advanced search and filtering</li>
                                <li>Top-rated restaurant recommendations</li>
                                <li>Detailed restaurant information</li>
                                <li>User-friendly interface</li>
                            </ul>
                        </div>
                        
                        <div className="about-section">
                            <h2>Our Story</h2>
                            <p>
                                Founded in 2025, Restaurant App was born from a simple idea: 
                                making great food discovery accessible to everyone. We believe 
                                that every meal should be an adventure, and we're here to help 
                                you find your next favorite restaurant.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
