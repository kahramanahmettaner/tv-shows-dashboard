import { useShowDetailsStore } from '../../store/showDetailsStore';
import styles from './showCard.module.css';

const ShowCard = () => {

    const { 
        show_name, 
        actors, 
        description, 
        years, 
        imdb_rating, 
        image
    } = useShowDetailsStore(state => state)

    return (
        <div className={styles.showCard}>
                <img src={image} alt={show_name} className={styles.showImage} />
                <div className={styles.showDetails}>
                    <div className={styles.topContainer}>
                        <h2 className={styles.showName}>{show_name}</h2>
                        <div className={styles.imdbRating}>{imdb_rating}</div>
                    </div>

                    <p className={styles.showYear}>{years}</p>
                    <p className={styles.showActors}>{actors}</p>
                    <p className={styles.showDescription}>{description}</p>
                </div>
        </div>
    );
}

export default ShowCard;