import { baseUrl } from './index';
import { IShowDetails } from '../types';

export const getShowDetails = async (imdb_id: string): Promise<IShowDetails> => {
    const url = baseUrl + `/show-details` + `?imdb_id=${encodeURIComponent(imdb_id)}`;

    return new Promise<IShowDetails>((resolve, reject) => {

        fetch(url)
        .then( response => {
            console.log(response)
            if (!response.ok) { 
                // TODO: return the error message which sent from backend and not just the statusText
                reject(response.statusText)
            } else { 
                response.json()
                .then( data => { resolve(data) })
            }
        })
        .catch( error => { 
            error && error.message ? reject(error.message) : reject("An unknown error occurred.")
        })   
    });
    
}