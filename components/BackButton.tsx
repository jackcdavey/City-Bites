import { useRouter } from 'next/router';
import styles from '../styles/BackButton.module.css';

const BackButton = () => {
    const router = useRouter();

    return (
        <button className={styles.backButton} onClick={() => router.back()}>
            &#60; Back
        </button>
    );
};

export default BackButton;
