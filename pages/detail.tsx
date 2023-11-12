import { useState } from 'react';
import { Restaurant } from '../types';
import ReviewCard from '../components/ReviewCard';
import Image from 'next/image';

type DetailProps = {
    restaurant: Restaurant;
};

const Detail = ({ restaurant }: DetailProps) => {
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    return (
        <div className="detail-container">
            <div className="detail-top-row">
                <div className="detail-image-container">
                    <Image src={restaurant.image} alt={restaurant.name} />
                </div>
                <div className="detail-info-container">
                    <h1>{restaurant.name}</h1>
                    <p>{restaurant.description}</p>
                    <button onClick={handleLike}>{liked ? 'Unlike' : 'Like'}</button>
                </div>
            </div>
            <div className="detail-review-row">
                {restaurant.reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
};

export default Detail;
