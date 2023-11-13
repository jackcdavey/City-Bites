import { useState } from 'react';

const RestaurantSearch = () => {
    const [city, setCity] = useState('');
    const [restaurants, setRestaurants] = useState([]);

    const searchRestaurants = async () => {
        const response = await fetch(`/api/yelp?city=${city}`);
        const data = await response.json();
        setRestaurants(data.businesses);
    };

    return (
        <div>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <button onClick={searchRestaurants}>Search</button>
            <ul>
                {restaurants && restaurants.length > 0 ? (
                    restaurants.map(restaurant => <li key={restaurant.id}>{restaurant.name}</li>)
                ) : (
                    <li>No restaurants found</li>
                )}
            </ul>

        </div>
    );
};

export default RestaurantSearch;