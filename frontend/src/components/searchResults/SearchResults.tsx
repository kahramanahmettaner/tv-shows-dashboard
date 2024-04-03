import styles from './searchResults.module.css'

interface SearchResultsProps {
    isLoading: boolean;
    errorMessage: string;
}


const SearchResults = ({ isLoading, errorMessage }: SearchResultsProps) => {

    return (
        <div>SearchResults</div>
    )
}

export default SearchResults