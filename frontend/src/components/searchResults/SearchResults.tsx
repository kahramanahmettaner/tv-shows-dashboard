import styles from './searchResults.module.css'
import { useSearchShowStore } from '../../store/searchShowStore';
import SearchResultsShowCard from '../searchResultsShowCard/SearchResultsShowCard';
import { IShowSearchResult } from '../../types';

const SearchResults = () => {
    const { shows, loading, errorMessage } = useSearchShowStore( state => state )

    const loadingContent = <p>Loading...</p>

    const errorContent = <p>Error: {errorMessage}</p>

    const showsContent = ( 
        <>
            {shows.map((show: IShowSearchResult) => (
                <SearchResultsShowCard key={show.imdb_id} show={show} />
            ))}
        </>
    )

    return (
        <div className={styles['search-results']}>
            {/* Display loading message while loading */}
            {loading && loadingContent}

            {/* Display error message if there's an error */}
            {errorMessage && errorContent}

            {/* Display fetched shows when there is no error and not loading */}
            {/* Display nothing if there is no show to display */}
            {!loading && !errorMessage && (
                shows.length == 0 || showsContent
            )}
        </div>
    )
}

export default SearchResults