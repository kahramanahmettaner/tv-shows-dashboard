import styles from './searchBar.module.css'
import { Dispatch, SetStateAction } from 'react'

interface SearchBarProps {
    setLoading: Dispatch<SetStateAction<boolean>>;
    setErrorMessage: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ setLoading, setErrorMessage }: SearchBarProps) => {
    
    return (
        <div>SearchBar</div>
    )
}

export default SearchBar