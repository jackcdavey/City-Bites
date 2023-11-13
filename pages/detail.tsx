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
    const [restaurant, setRestaurant] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    const getRestaurantDetail = async () => {
        setIsLoading(true);
        try {
            const detailResponse = await fetch(`/api/yelp?id=${restaurantId}`);
            const details = await detailResponse.json();
            const reviewResponse = await fetch(`/api/yelp/?id=${restaurantId}/reviews`);
            const reviewList = await reviewResponse.json();
            setRestaurant(details);
            setReviews(reviewList.reviews);

            console.log(restaurant.name);
            console.log(reviews);
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
    }, [restaurantId]);

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
                    <div className={styles.grid}>
                        {
                            reviews ? (
                                reviews.map((review) => (
                                    <a
                                        href={review.url}
                                        key={review.id}
                                        target="_blank"
                                        rel="noopener noreferrer" >
                                        <div className={styles.card}>
                                            <h3>{review.user.name}</h3>
                                            <p>{review.text}</p>
                                            <p>{review.rating}</p>

                                        </div>
                                    </a>
                                ))
                            ) : (
                                <p>No reviews available.</p>
                            )
                        }
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
