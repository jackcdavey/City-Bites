import ReviewCard from '../components/ReviewCard';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import StarRating from '../components/StarRating.js';
import { getOrCreateUserId } from '../utils/userSetup';
import BackButton from '../components/BackButton';



const Detail = () => {
    const router = useRouter();
    const restaurantId = router.query.restaurant;
    const [liked, setLiked] = useState(false);
    const [restaurant, setRestaurant] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleLike = async () => {
        const businessId = restaurantId;
        const userId = getOrCreateUserId();

        try {
            const method = liked ? 'DELETE' : 'POST';
            const url = liked ? '/api/unlike' : '/api/like';
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ businessId, userId }),
            });

            if (response.ok) {
                setLiked(!liked);
            } else {
                const data = await response.json();
                console.error(data.error);
            }
        } catch (error) {
            console.error('Failed to update like status:', error);
        }
    };



    const getRestaurantDetail = async () => {
        setIsLoading(true);
        try {
            const detailResponse = await fetch(`/api/yelp?id=${restaurantId}`);
            const details = await detailResponse.json();
            setRestaurant(details);

            console.log(details.name); // Logging the fetched restaurant's name

            const reviewResponse = await fetch(`/api/yelp/?id=${restaurantId}/reviews`);
            const reviewList = await reviewResponse.json();
            setReviews(reviewList.reviews);
        } catch (error) {
            console.error("Error fetching restaurant:", error);
        } finally {
            setIsLoading(false);
        }
    };



    const fetchLikedBusinesses = async (userId) => {
        try {
            const response = await fetch(`/api/get-likes?userId=${userId}`);
            const data = await response.json();
            return data.likedBusinessIds;
        } catch (error) {
            console.error('Error fetching liked businesses:', error);
            return [];
        }
    };


    useEffect(() => {
        if (restaurantId) {
            getRestaurantDetail();
        }
    }, [restaurantId]);

    useEffect(() => {
        const userId = getOrCreateUserId();
        fetchLikedBusinesses(userId).then((likedBusinesses) => {
            if (likedBusinesses.includes(restaurantId)) {
                setLiked(true);
            }
        });
    }, [restaurantId]);


    return (
        <div className={styles.container}>

            <Head>
                <title>{restaurant ? restaurant.name : 'Restaurant Details'}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <BackButton />

                {isLoading ? (
                    <p>Loading...</p>
                ) : restaurant ? (
                    <>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <div className={styles.card} style={{ backgroundImage: `url(${restaurant.image_url})` }}>
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                            }}>
                                <h1>{restaurant.name}</h1>
                                <p>{restaurant.categories[0].title}</p>
                                <p>{restaurant.location.display_address}</p>

                                <StarRating rating={restaurant.rating} />
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
                                                <p style={{ maxHeight: '80%', overflow: 'scroll' }}>{review.text}</p>
                                                <StarRating rating={review.rating} />

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
            </main>
        </div>
    );
};

export default Detail;
