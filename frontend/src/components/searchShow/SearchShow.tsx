import styles from './searchShow.module.css'
import SearchBar from '../searchBar/SearchBar'
import SearchResults from "../searchResults/SearchResults"

const SearchShow = () => {

    return (
        <div className={styles['search-show-container']}>
            <SearchBar />
            <SearchResults />
        </div> 
    )
}

export default SearchShow