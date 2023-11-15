import Head from 'next/head';
import styles from '../styles/Home.module.css';
import StarRating from '../components/StarRating.js';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getOrCreateUserId } from '../utils/userSetup';
import BackButton from '../components/BackButton';

export default function Businesses() {
    const { query: { city } } = useRouter();
    const [restaurantState, setRestaurantState] = useState({
        isLoading: false,
        data: [],
    });

    useEffect(() => {
        async function fetchData() {
            if (!city) return;

            setRestaurantState({ isLoading: true, data: [] });

            try {
                const userId = getOrCreateUserId();
                const [restaurantResponse, likesResponse] = await Promise.all([
                    fetch(`/api/yelp?city=${city}`),
                    fetch(`/api/get-likes?userId=${userId}`),
                ]);

                const restaurantData = await restaurantResponse.json();
                const likesData = await likesResponse.json();

                const updatedRestaurants = restaurantData.businesses.map(restaurant => ({
                    ...restaurant,
                    liked: likesData.likedBusinessIds.includes(restaurant.id),
                }));

                setRestaurantState({ isLoading: false, data: updatedRestaurants });
            } catch (error) {
                console.error("Error fetching data:", error);
                setRestaurantState({ isLoading: false, data: [] });
            }
        }

        fetchData();
    }, [city]);

    const { isLoading, data: restaurants } = restaurantState;

    return (
        <div className={styles.container}>
            <Head>
                <title>Restaurants: {city}</title>
                <meta name="description" content={`A list of top restaurants in ${city}`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <BackButton />

            <main className={styles.main}>
                <p className={styles.description}>
                    Top Restaurants In...
                </p>

                <h1 className={styles.title}>{city}</h1>

                <div className={styles.grid}>
                    {isLoading ? (
                        <h4>Loading...</h4>
                    ) : restaurants && restaurants.length > 0 ? restaurants.map((restaurant) => (
                        <Link
                            href={{
                                pathname: "/detail",
                                query: { restaurant: restaurant.id },
                            }}
                            key={restaurant.id}
                        >
                            <div
                                className={styles.card}
                                style={{
                                    backgroundImage: `url(${restaurant.image_url})`,
                                    boxShadow: restaurant.liked ? "0 0 3rem green" : "none"
                                }}>
                                <div className={styles.cardContent}>
                                    <h3>{restaurant.name}</h3>
                                    <h4>{restaurant.categories[0].title}</h4>
                                    <StarRating rating={restaurant.rating} />
                                </div>
                            </div>
                        </Link>
                    )) : (
                        <h4>No restaurants found</h4>
                    )}
                </div>
            </main>

            <footer className={styles.footer} />
        </div>
    );
}
