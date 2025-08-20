import './SearchBar.css';
import TopRatedRestaurants from "../TopRatedRestaurants/TopRatedRestaurants.jsx";
import {useState} from "react";

const SearchBar = ({setRestaurants, allRestaurants}) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    return (
        <>
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search for restaurants..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        const q = searchTerm.trim().toLowerCase();
                        if (!q) {
                            setRestaurants(allRestaurants); // reset si está vacío
                            return;
                        }
                        const filtered = allRestaurants.filter(r =>
                            r.info.name.toLowerCase().includes(q));
                        setRestaurants(filtered);
                        setSearchTerm('');
                    }
                }}
            />
            <button onClick={() => {
                const q = searchTerm.trim().toLowerCase();
                if (!q) {
                    setRestaurants(allRestaurants); // reset si está vacío
                    return;
                }
                const filteredRests = allRestaurants.filter(restaurant =>
                    restaurant.info.name.toLowerCase().includes(q)
                );
                setRestaurants(filteredRests);
                setSearchTerm(''); // Clear the search input after searching
            }}>🔎</button>
        </div>
            <TopRatedRestaurants
                setRestaurants={setRestaurants}
                allRestaurants={allRestaurants}
            />
        </>
    )
}
export default SearchBar;