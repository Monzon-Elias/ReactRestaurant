import './Error.css';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';

const Error = ({ errorCode = "404", errorMessage = "Page Not Found", description = "The page you're looking for doesn't exist." }) => {
    return (
        <div className="app">
            <Header />
            <div className="error-page">
                <div className="error-container">
                    <div className="error-content">
                        <div className="error-icon">🚫</div>
                        <h1 className="error-code">{errorCode}</h1>
                        <h2 className="error-title">{errorMessage}</h2>
                        <p className="error-description">{description}</p>
                        
                        <div className="error-actions">
                            <button 
                                className="primary-btn"
                                onClick={() => window.history.back()}
                            >
                                ← Go Back
                            </button>
                            <button 
                                className="secondary-btn"
                                onClick={() => window.location.href = '/'}
                            >
                                🏠 Go Home
                            </button>
                        </div>
                        
                        <div className="error-help">
                            <h3>Need Help?</h3>
                            <p>Try these options:</p>
                            <ul>
                                <li>Check the URL for typos</li>
                                <li>Use the navigation menu above</li>
                                <li>Go back to the homepage</li>
                                <li>Contact our support team</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Error;
