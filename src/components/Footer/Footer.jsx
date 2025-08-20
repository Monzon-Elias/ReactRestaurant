import './Footer.css';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Restaurant App</h3>
                    <p>Your gateway to culinary excellence</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                        <span>📱</span>
                        <span>📘</span>
                        <span>📷</span>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 Restaurant App. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
