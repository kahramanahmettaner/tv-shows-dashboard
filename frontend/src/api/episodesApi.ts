import { baseUrl } from './index';
import { IEpisode } from '../types';

export const getEpisodes = async (imdb_id_input: string, season_number_input: number): Promise<IEpisode[]> => {
    const url = baseUrl + `/season-details` 
    + `?imdb_id=${encodeURIComponent(imdb_id_input)}` 
    + `&season_number=${encodeURIComponent(season_number_input)}`;

    return new Promise<IEpisode[]>((resolve, reject) => {

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