import './Contact.css';

const Contact = () => {
    return (
        <div className="app">
        
            <div className="contact-page">
                <div className="contact-container">
                    <h1 className="contact-title">Contact Us</h1>
                    
                    <div className="contact-content">
                        <div className="contact-info">
                            <h2>Get in Touch</h2>
                            <p>
                                Have questions or suggestions? We'd love to hear from you! 
                                Reach out to us through any of the channels below.
                            </p>
                            
                            <div className="contact-methods">
                                <div className="contact-method">
                                    <span className="contact-icon">📧</span>
                                    <div>
                                        <h3>Email</h3>
                                        <p>hello@restaurantapp.com</p>
                                    </div>
                                </div>
                                
                                <div className="contact-method">
                                    <span className="contact-icon">📱</span>
                                    <div>
                                        <h3>Phone</h3>
                                        <p>+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                
                                <div className="contact-method">
                                    <span className="contact-icon">📍</span>
                                    <div>
                                        <h3>Address</h3>
                                        <p>123 Food Street, Cuisine City, CC 12345</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="contact-form">
                            <h2>Send us a Message</h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" placeholder="Your name" />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" placeholder="your@email.com" />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea id="message" rows="5" placeholder="Your message..."></textarea>
                                </div>
                                
                                <button type="submit" className="submit-btn">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
