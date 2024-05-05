import { baseUrl } from './index';
import { ICredits } from '../types';

export const getCredits = async (imdb_id_input: string): Promise<ICredits> => {
    const url = baseUrl + `/show-credits` + `?imdb_id=${encodeURIComponent(imdb_id_input)}`;

    return new Promise<ICredits>((resolve, reject) => {

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