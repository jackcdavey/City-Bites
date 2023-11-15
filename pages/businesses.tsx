import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import StarRating from '../components/StarRating.js';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import { getOrCreateUserId } from '../utils/userSetup';


export default function Businesses() {
    const router = useRouter();
    const query = router.query;
    const city = query.city;
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const searchRestaurants = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/yelp?city=${city}`);
            const data = await response.json();
            setRestaurants(data.businesses);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
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
        if (city) {
            searchRestaurants();
        }
    }, [city]);

    useEffect(() => {
        const userId = getOrCreateUserId();
        fetchLikedBusinesses(userId).then((likedBusinesses) => {
            console.log(likedBusinesses);
        });
    }, []);




    return (
        <div className={styles.container}>
            <Head>
                <title>Restaurants: {city}</title>
                <meta name="description" content={"A list of top restaurants in" + city} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

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
                    ) :

                        restaurants && restaurants.length > 0 ? restaurants.map((restaurant) => (
                            <Link
                                href={{
                                    pathname: "/detail",
                                    query: {
                                        restaurant: restaurant.id,
                                    }
                                }}
                                key={restaurant.name}
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
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
        </div>
    )
}
