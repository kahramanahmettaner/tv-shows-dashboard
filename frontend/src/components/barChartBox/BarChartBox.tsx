import { useState } from "react";
import BarChartReusable from "../../componentsReusable/barChartReusable/BarChartReusable";
import Dropdown from "../../componentsReusable/dropdown/Dropdown";
import { useShowDetailsStore } from "../../store/showDetailsStore"
import { IEpisode } from "../../types";

const BarChartBox = () => {

    // Get episodes
    const { 
        episodes
    } = useShowDetailsStore( state => state )

    // Clone episodes data
    let episodesCloned: IEpisode[] = JSON.parse(JSON.stringify(episodes));


    // Different Categories and Dropdown
    // Find seasons for which episode data is available
    const availableSeasons = new Set(episodesCloned.map(episode => episode.season_number));
    const availableSeasonsArray = Array.from(availableSeasons).sort((a, b) => a - b);

    // List of categories (e.g., ['All Episodes', 'Season 1', ...])
    let categories = availableSeasonsArray.map( (season: number) => {
        return {
            key: season,
            title: `Season ${season}`
        }
    } );

    categories = [
        ...categories,
        {
            key: -1,
            title: 'All Episodes'
        },   
    ];

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


    // Adjust episodes
    // TODO: somehow season_number is not integer. but fix this and then use === here, instead ==
    const episodesForBarChart = filteredEpisodes.map((episode) => ({
        name: `Season ${episode.season_number} Episode ${episode.episode_number}`,
        imdb_rating: episode.imdb_rating,
    }));

    const barChartData = {
        title: "",
        color: "#FF8042",
        dataKey: "imdb_rating",
        chartData: episodesForBarChart
    };

    return (
        <>
            <Dropdown
                dropdownItems={categories.map(category => category.title)}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
            />
            <BarChartReusable {...barChartData} /> 
        </>
    )
}

export default BarChartBox