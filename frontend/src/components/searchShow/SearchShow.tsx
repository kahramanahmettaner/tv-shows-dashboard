import { useState } from "react"
import SearchBar from "../searchBar/SearchBar"
import SearchResults from "../searchResults/SearchResults"

const SearchShow = () => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState('')

    return (
        <>
            <SearchBar setLoading={setLoading} setErrorMessage={setErrorMessage}/>
            <SearchResults isLoading={isLoading} errorMessage={errorMessage} />
        </> 
    )
}

export default SearchShow