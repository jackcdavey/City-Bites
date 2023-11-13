const SvgStar = ({ filled }) => (
    <svg width="25" height="25" viewBox="0 0 25 25">
        <path
            d="M12 .587l3.09 6.26 6.91 1.005-5 4.87 1.18 6.88L12 17.01 6.82 19.6l1.18-6.88-5-4.87 6.91-1.005L12 .587z"
            fill={filled ? '#0070f3' : '#DDDDDD'}
        />
    </svg>
);

export default SvgStar;