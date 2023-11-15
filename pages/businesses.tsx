import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import StarRating from '../components/StarRating.js';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import { getOrCreateUserId } from '../utils/userSetup';
import BackButton from '../components/BackButton';


export default function Businesses() {
    const router = useRouter();
    const query = router.query;
    const city = query.city;
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [likedBusinessIds, setLikedBusinessIds] = useState([]);
    const [likedIdsFetched, setLikedIdsFetched] = useState(false);



    useEffect(() => {
        const fetchData = async () => {
            if (city) {
                setIsLoading(true);
                try {
                    const userId = getOrCreateUserId();
                    const restaurantResponse = await fetch(`/api/yelp?city=${city}`);
                    const restaurantData = await restaurantResponse.json();
                    const likesResponse = await fetch(`/api/get-likes?userId=${userId}`);
                    const likesData = await likesResponse.json();

                    const updatedRestaurants = restaurantData.businesses.map(restaurant => ({
                        ...restaurant,
                        liked: likesData.likedBusinessIds.includes(restaurant.id),
                    }));

                    setRestaurants(updatedRestaurants);
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, [city]);





    return (
        <div className={styles.container}>
            <Head>
                <title>Restaurants: {city}</title>
                <meta name="description" content={"A list of top restaurants in" + city} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <BackButton />

            <main className={styles.main}>
                <p className={styles.description}>
                    Top Restaurants In...
                </p>

                <h1 className={styles.title}>
                    {city}
                </h1>



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

            <footer className={styles.footer}>

            </footer>
        </div>
    )
}
