import React from 'react';
import styles from './searchResultsShowCard.module.css';
import { IShow } from '../../types';
import { Link } from 'react-router-dom'

interface SearchResultsShowCardProps {
    show: IShow;
}

const SearchResultsShowCard: React.FC<SearchResultsShowCardProps> = ({ show }) => {
    return (
        <Link to={`/dashboard?imdb_id=${show.imdb_id}`}>
            <div key={show.imdb_id} className={styles.showCard}>
                <img src={show.img} alt={show.name} className={styles.showImage} />
                <div className={styles.showDetails}>
                    <h2 className={styles.showName}>{show.name}</h2>
                    <p className={styles.showYear}>{show.year}</p>
                    <p className={styles.showActors}>{show.actors}</p>
                    <p className={styles.showType}>{show.type}</p>
                </div>
            </div>
        </Link>
    );
}

export default SearchResultsShowCard;