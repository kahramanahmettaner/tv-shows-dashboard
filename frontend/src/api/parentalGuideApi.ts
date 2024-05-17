import { baseUrl } from './index';
import { IParentalGuideCategory } from '../types';

export const getParentalGuide = async (imdb_id_input: string): Promise<IParentalGuideCategory[]> => {
    const url = baseUrl + `/parental-guide` + `?imdb_id=${encodeURIComponent(imdb_id_input)}`;

    return new Promise<IParentalGuideCategory[]>((resolve, reject) => {

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