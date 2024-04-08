import styles from './searchResults.module.css'

interface SearchResultsProps {
    isLoading: boolean;
    errorMessage: string;
}


const SearchResults = ({ isLoading, errorMessage }: SearchResultsProps) => {

    // TODO: implement
    // get the fetched tv shows
    const shows = [] 

    const loadingContent = <p>Loading...</p>

    const errorContent = <p>Error: {errorMessage}</p>

    const showsContent = <h1> Not Implemented </h1>

    return (
        <>
            {/* Display loading message while loading */}
            {isLoading && loadingContent}

            {/* Display error message if there's an error */}
            {errorMessage && errorContent}

            {/* Display fetched shows when there is no error and not loading */}
            {/* Display nothing if there is no show to display */}
            {!isLoading && !errorMessage && (
                shows.length == 0 || showsContent
            )}
        </>
    )
}

export default SearchResults