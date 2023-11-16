import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../styles/Detail.module.css';
import Head from 'next/head';
import StarRating from '../components/StarRating.js';
import { getOrCreateUserId } from '../utils/userSetup';
import LikeButton from '../components/LikeButton';
import BackButton from '../components/BackButton';

const Detail = () => {
    const { query: { restaurant: restaurantId } } = useRouter();
    const [state, setState] = useState({
        isLoading: false,
        liked: false,
        restaurant: null,
        reviews: [],
    });


    const fetchData = async () => {
        if (!restaurantId) return;

        setState(prevState => ({ ...prevState, isLoading: true }));

        try {
            const userId = getOrCreateUserId();
            const [detailResponse, likesResponse] = await Promise.all([
                fetch(`/api/yelp?id=${restaurantId}`),
                fetch(`/api/get-likes?userId=${userId}`),
            ]);
            const [details, likesData] = await Promise.all([detailResponse.json(), likesResponse.json()]);

            const reviewResponse = await fetch(`/api/yelp/?id=${restaurantId}/reviews`);
            const reviewList = await reviewResponse.json();

            setState({
                isLoading: false,
                liked: likesData.likedBusinessIds.includes(restaurantId),
                restaurant: details,
                reviews: reviewList.reviews,
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            setState(prevState => ({ ...prevState, isLoading: false }));
        }
    };

    useEffect(() => {
        fetchData();
    }, [restaurantId]);

    const { isLoading, liked, restaurant, reviews } = state;

    return (
        <div className={styles.container}>
            <Head>
                <title>{restaurant ? restaurant.name : 'Restaurant Details'}</title>
                <meta name="description" content="A list of top restaurants in your city" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <BackButton />
                {isLoading ? <p>Loading...</p> : renderContent()}
            </main>
        </div>
    );

    function renderContent() {
        if (!restaurant)
            return <p>Restaurant details not available.</p>;

        return (
            <>
                {isLoading ? (
                    <p>Loading...</p>
                ) : restaurant ? (
                    <>
                        <div className={styles.detail} >
                            <div
                                className={styles.card}
                                style={{
                                    backgroundImage: `url(${restaurant.image_url})`,
                                    boxShadow: liked ? '0 0 3rem green' : 'none',
                                }}
                            >
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                            }}>
                                <h1>{restaurant.name}</h1>
                                <h3>{restaurant.categories[0].title}</h3>
                                <p>{restaurant.location.address1}, {restaurant.location.city}  {restaurant.location.zip_code}</p>

                                <StarRating rating={restaurant.rating} />
                                <LikeButton
                                    liked={state.liked}
                                    onToggle={() => setState(prevState => ({ ...prevState, liked: !prevState.liked }))}
                                    restaurantId={restaurantId}
                                />

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
                                            <div className={styles.review}>
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
                        </div>
                    </>
                ) : (
                    <p>Restaurant details not available.</p>
                )}
            </>
        );
    }
};

export default Detail;
