import styles from './searchBar.module.css'
import { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { getShows } from '../../api'

interface SearchBarProps {
    setLoading: Dispatch<SetStateAction<boolean>>;
    setErrorMessage: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ setLoading, setErrorMessage }: SearchBarProps) => {

    const [input, setInput] = useState('')

    const handleInput = (e: any) => {
        const currentInput = e.target.value
        setInput(currentInput)
    }   

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setErrorMessage('')
        setLoading(true)

        // fetch shows by showname
       getShows(input)
       .then( shows => {
            if (shows) console.log(shows)
            // TODO: implement
            // setState for shows

            setErrorMessage('')
            setLoading(false)
        })
        .catch( errorMessage => {
            console.error(errorMessage)

            setErrorMessage(errorMessage)
            setLoading(false)
        })
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