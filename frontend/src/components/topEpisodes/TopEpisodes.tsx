import { useState } from "react";
import { useShowDetailsStore } from "../../store/showDetailsStore"
import { IEpisode } from "../../types";
import TopBox from "../topBox/TopBox";
import Dropdown from "../dropdown/Dropdown";

const TopEpisodes = () => {

    // Episodes Data
    const episodes = useShowDetailsStore( state => state.episodes )
    const loadingEpisodes = useShowDetailsStore( state => state.loadingEpisodes )
    const errorMessageEpisodes = useShowDetailsStore( state => state.errorMessageEpisodes )
    
    // Clone episodes data
    let episodesCloned: IEpisode[] = JSON.parse(JSON.stringify(episodes));

    
    // Different Categories and Dropdown
    // Find seasons for which episode data is available
    const availableSeasons = new Set(episodesCloned.map(episode => episode.season_number));
    const availableSeasonsArray = Array.from(availableSeasons).sort((a, b) => a - b);

    // List of categories (e.g., ['Top Episodes', 'Season 1 Top Episodes', ...])
    let categories = availableSeasonsArray.map( (season: number) => {
        return {
            key: season,
            title: `Season ${season}`
        }
    } );

    categories = [{
        key: -1,
        title: 'Top Episodes'
    },  ...categories ];

    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectedCategory = categories[selectedIndex];



    // Filter the episodes according to the selection
    const filteredEpisodes: IEpisode[] = episodesCloned.filter(episode => {
        // All Episodes (when `selectedCategory.key` is -1)
        if (selectedCategory.key === -1) {
            return true;
        }

        // Filter by season
        return episode.season_number === selectedCategory.key;
    });


    // Sort episodes by imdb_rating in descending order
    filteredEpisodes.sort((a, b) => b.imdb_rating - a.imdb_rating);
    
    // Slice the array to get only the top 10 episodes
    const top10Episodes = filteredEpisodes.slice(0, 10);

    // Add episode_title to each episode object using the season_number and episode_number
    const top10EpisodesWithTitle = top10Episodes.map(episode => {
        const episode_title  = `Season ${episode.season_number} Episode ${episode.episode_number} `
        return { ...episode, episode_title: episode_title };
    })

    const loadingContent = <p>Loading...</p>

    const errorContent = <p>Error: {errorMessageEpisodes}</p>

    return (
        <>
            {/* Display loading message while loading */}
            {loadingEpisodes && loadingContent}

            {/* Display error message if there's an error */}
            {errorMessageEpisodes && errorContent}

            {/* Display fetched shows when there is no error and not loading */}
            {/* Display nothing if there is no show to display */}
            {!loadingEpisodes && !errorMessageEpisodes && (
                top10EpisodesWithTitle.length == 0 || 
            <>
            <Dropdown 
                dropdownItems={categories.map(category => category.title)}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
            />
            <TopBox
                listTitle=""
                items={top10EpisodesWithTitle}
                attributeNames={{ image: 'image_link', title: 'episode_title', details: 'episode_name', value: 'imdb_rating' }}
                titleColor="#FFF"
                valueColor="#FF8042"
                detailsColor="#978"
            />
            </>
            )}
        </>
    )
}

export default TopEpisodes