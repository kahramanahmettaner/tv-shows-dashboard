import styles from './searchShow.module.css'
import { useState } from "react"
import SearchBar from "../searchBar/SearchBar"
import SearchResults from "../searchResults/SearchResults"

const SearchShow = () => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState('')

    return (
        <div className={styles['search-show-container']}>
            <SearchBar setLoading={setLoading} setErrorMessage={setErrorMessage}/>
            <SearchResults isLoading={isLoading} errorMessage={errorMessage} />
        </div> 
    )
}

export default SearchShow