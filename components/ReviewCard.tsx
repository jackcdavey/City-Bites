import { Review } from '../types';

type ReviewCardProps = {
    review: Review;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
    return (
        <div className="review-card">
            <h3>{review.name}</h3>
            <p>{review.comment}</p>
            <p>Rating: {review.rating}</p>
        </div>
    );
};

export default ReviewCard;
