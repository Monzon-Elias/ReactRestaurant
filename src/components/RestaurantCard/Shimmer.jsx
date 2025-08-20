// src/components/Shimmer/Shimmer.jsx
import './Shimmer.css';

export default function Shimmer({ count = 8 }) {
    return (
        <div className="restaurant-list">
            {Array.from({ length: count }).map((_, i) => (
                <div className="shimmer-card" key={i}>
                    <div className="shimmer-img shimmer-animate" />
                    <div className="shimmer-content">
                        <div className="shimmer-line shimmer-animate" style={{ width: '70%' }} />
                        <div className="shimmer-line shimmer-animate" style={{ width: '50%' }} />
                        <div className="shimmer-line shimmer-animate" style={{ width: '85%' }} />
                        <div className="shimmer-line shimmer-animate" style={{ width: '40%' }} />
                    </div>
                </div>
            ))}
        </div>
    );
}