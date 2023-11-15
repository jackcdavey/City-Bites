import React from 'react';
import { getOrCreateUserId } from '../utils/userSetup';

const LikeButton = ({ liked, onToggle, restaurantId }) => {
    const handleLike = async () => {
        const userId = getOrCreateUserId();
        const method = liked ? 'DELETE' : 'POST';
        const url = liked ? '/api/unlike' : '/api/like';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ businessId: restaurantId, userId }),
            });

            if (response.ok) {
                onToggle();
            } else {
                console.error('Error toggling like status');
            }
        } catch (error) {
            console.error('Failed to update like status:', error);
        }
    };

    return (
        <button
            onClick={handleLike}
            style={{
                backgroundColor: liked ? 'red' : 'white',
                color: liked ? 'white' : 'black',
                border: '1px solid black',
                borderRadius: '0.5rem',
                padding: '0.5rem',
                cursor: 'pointer',
                maxWidth: '5rem',
            }}
        >
            {liked ? 'Unlike' : 'Like'}
        </button>
    );
};

export default LikeButton;
