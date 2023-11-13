import SvgStar from './StarSVG.js';

const StarRating = ({ rating }) => {
    const totalStars = 5;
    let stars = [];

    for (let i = 1; i <= totalStars; i++) {
        let starFill;
        if (i <= rating) {
            // Fully filled star
            starFill = 'full';
        } else if (i - 0.5 <= rating) {
            // Half-filled star
            starFill = 'half';
        } else {
            // Unfilled star
            starFill = 'none';
        }

        stars.push(
            <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
                {starFill === 'half' && (
                    <>
                        <SvgStar filled={false} />
                        <span style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
                            <SvgStar filled={true} />
                        </span>
                    </>
                )}
                {starFill !== 'half' && <SvgStar filled={starFill === 'full'} />}
            </span>
        );
    }

    return <div style={{ display: 'inline-block' }}>{stars}</div>;
};

export default StarRating;