import styles from './simpleAreaChartBox.module.css'
import { useState } from "react";
import Dropdown from "../../componentsReusable/dropdown/Dropdown";
import { useShowDetailsStore } from "../../store/showDetailsStore"
import { IEpisode } from "../../types";
import SimpleAreaChartReusable from "../../componentsReusable/simpleAreaChartReusable/SimpleAreaChartReusable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const SimpleAreaChartBox = () => {

    // Get episodes
    const { 
        episodes, loadingEpisodes, errorMessageEpisodes
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
        {
            key: -1,
            title: 'All Episodes'
        },   
        ...categories,
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
    const episodesForAreaChart = filteredEpisodes.map( episode => {
        return { 
        name: `Season ${episode.season_number} Episode ${episode.episode_number}`, 
        imdb_rating: episode.imdb_rating  
        }
    })


    const areaChartBoxData = {
        color: "#FF8042",
        dataKey: "imdb_rating",
        chartData: episodesForAreaChart
      };
    

    const simpleAreaChartBoxContent = (
        <>
            <Dropdown
                dropdownItems={categories.map(category => category.title)}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
            />
            <SimpleAreaChartReusable {...areaChartBoxData} />  
        </>
    )

    return (
        <div className={styles.box}>

{ errorMessageEpisodes !== ''
                ? <p>{errorMessageEpisodes}</p>
                
                : loadingEpisodes && (episodesForAreaChart.length === 0) 
                ?   <>
                        <Dropdown
                            dropdownItems={categories.map(category => category.title)}
                            selectedIndex={selectedIndex}
                            setSelectedIndex={setSelectedIndex}
                        />
                        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '2rem' }}/>
                        </div>
                    </>

                :
                <>
                    {
                        loadingEpisodes &&
                        <FontAwesomeIcon icon={faSpinner} spin style={{ position: 'absolute', top: '10px', right: '10px' }}/>
                    }     
                    {simpleAreaChartBoxContent}
                </>
            }
        </div>
    )
}

export default SimpleAreaChartBox