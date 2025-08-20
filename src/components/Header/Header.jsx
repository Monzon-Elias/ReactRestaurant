import logo from "../../assets/react-app-logo-nobg.png";
import './Header.css';
import {useState} from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [login, setLogin] = useState('Login');
    return (
        <div className="header">
            <div className={'logo-container'}>
                <img src={logo} className="logo" alt="logo" />
            </div>
            <div className='nav-container'>
                <ul className='nav-items'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li>
                        <button
                            className="lilo"
                            onClick={() => setLogin(prev => (prev === 'Login' ? 'Logout' : 'Login'))}
                            style={{ 
                                background: login === 'Logout' ? 
                                'linear-gradient(135deg, #667eea, #764ba2)' : 
                                'linear-gradient(135deg,rgb(93, 190, 144),rgb(144, 92, 196))', 
                                color: 'white' }}
                        >
                            {login}
                        </button>

                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Header;