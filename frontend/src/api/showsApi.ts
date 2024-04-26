import { baseUrl } from './index';
import { IShowSearchResult } from '../types';

export const getShows = async (show_name: string): Promise<IShowSearchResult[]> => {
    const url = baseUrl + `/shows` + `?show_name=${encodeURIComponent(show_name)}`;

    return new Promise<IShowSearchResult[]>((resolve, reject) => {

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