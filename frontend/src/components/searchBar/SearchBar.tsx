import styles from './searchBar.module.css'
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useSearchShowStore } from '../../store/searchShowStore'


const SearchBar = () => {

    const [input, setInput] = useState('')
    
    const fetchShows = useSearchShowStore( state => state.fetchShows )

    const handleInput = (e: any) => {
        const currentInput = e.target.value
        setInput(currentInput)
    }   

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        fetchShows(input)
    }

    return (
        <form className={styles["input-wrapper"]}>
            <button type='submit' onClick={ (e) => {handleSubmit(e)} }>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <input type="search" placeholder="Type to search for a tv show" value={input} onChange={ (e) => {handleInput(e)} }/>
        </form>
    )
}

export default SearchBar