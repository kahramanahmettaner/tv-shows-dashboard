import styles from './searchResults.module.css'
import { useSearchShowStore } from '../../store/searchShowStore';

const SearchResults = () => {
    const { shows, loading, errorMessage } = useSearchShowStore( state => state )

    const loadingContent = <p>Loading...</p>

    const errorContent = <p>Error: {errorMessage}</p>

    const showsContent = <h1> Not Implemented </h1>

    return (
        <>
            {/* Display loading message while loading */}
            {loading && loadingContent}

            {/* Display error message if there's an error */}
            {errorMessage && errorContent}

            {/* Display fetched shows when there is no error and not loading */}
            {/* Display nothing if there is no show to display */}
            {!loading && !errorMessage && (
                shows.length == 0 || showsContent
            )}
        </>
    )
}

export default SearchResults