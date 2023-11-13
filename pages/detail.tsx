import { Restaurant } from '../types';
import ReviewCard from '../components/ReviewCard';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'


const Detail = () => {
    const router = useRouter();
    const restaurantId = router.query.restaurant;
    const [liked, setLiked] = useState(false);
    const [restaurant, setRestaurant] = useState(null); // Initialize as null
    const [isLoading, setIsLoading] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    const getRestaurantDetail = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/yelp?id=${restaurantId}`);
            const data = await response.json();
            setRestaurant(data); // Assuming data is the restaurant object
        } catch (error) {
            console.error("Error fetching restaurant:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (restaurantId) {
            getRestaurantDetail();
        }
    }, [restaurantId]); // Update the dependency to restaurantId

    return (
        <div className="detail-container">
            {isLoading ? (
                <p>Loading...</p>
            ) : restaurant ? (
                <>
                    <div className="detail-top-row">
                        <div className={styles.card} style={{ backgroundImage: `url(${restaurant.image_url})` }}>
                            {/* <Image src={restaurant.image_url} width={400} height={400} alt={restaurant.name} /> */}
                        </div>
                        <div className="detail-info-container">
                            <h1>{restaurant.name}</h1>
                            <p>{restaurant.description}</p>
                            <button onClick={handleLike}>{liked ? 'Unlike' : 'Like'}</button>
                        </div>
                    </div>
                    <div className="detail-review-row">
                        {/* {restaurant.reviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))} */}
                    </div>
                </>
            ) : (
                <p>Restaurant details not available.</p>
            )}
        </div>
    );
};

export default Detail;
