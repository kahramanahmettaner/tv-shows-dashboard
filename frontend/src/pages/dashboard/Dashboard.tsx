import { useParams } from 'react-router-dom'
import styles from './dashboard.module.css'
import { useEffect } from 'react'
import { useShowDetailsStore } from '../../store/showDetailsStore'
import TopEpisodes from '../../components/topEpisodes/TopEpisodes'
import TopCredits from '../../components/topCredits/TopCredits'
import ParentalGuide from '../../components/parentalGuide/ParentalGuide'
import BarChartBox from '../../components/barChartBox/BarChartBox'

const Dashboard = () => {

  const { imdb_id } = useParams()

  // Check if imdb_id exists
  if (!imdb_id) {
    return (
      <div> 
        <h1> Dashboard </h1>
        <p> No IMDb ID provided! </p>
      </div>
    );
  }
  
  const { 
    fetchParentalGuide,
    show_name, seasons_count, fetchShowDetails,
    episodes, fetchEpisodes,
    fetchCredits
  } = useShowDetailsStore( state => state )
  
  useEffect(() => {
    fetchParentalGuide(imdb_id)

    fetchShowDetails(imdb_id)

    // to test the function: fetch the episodes of the first season of the tv show specified by imdb_id
    fetchEpisodes(imdb_id, 1)

    fetchCredits(imdb_id)

  }, [imdb_id])

  const episodesForChart = episodes.map( episode => {
    return { 
      name: `Season ${episode.season_number} Episode ${episode.episode_number}`, 
      imdb_rating: episode.imdb_rating  
    }
  })

  const barChartBoxData = {
    title: "Season 1 Episodes",
    color: "#FF8042",
    dataKey: "imdb_rating",
    chartData: episodesForChart
  };

  return (
    <div className={styles.dashboard}>

      <div className={`${styles.box} ${styles.box1}`}>
        <TopEpisodes />
      </div>
      <div className={`${styles.box} ${styles.box2}`}>Showname: {show_name}</div>
      <div className={`${styles.box} ${styles.box3}`}>Seasons Count: {seasons_count}</div>
      <div className={`${styles.box} ${styles.box4}`}>
        <TopCredits />
      </div>
      
      
      <div className={`${styles.box} ${styles.box2}`}>
        <ParentalGuide />
      </div>
      
      <div className={`${styles.box} ${styles.box2}`}>
        <BarChartBox {...barChartBoxData} /> 
      </div>

    </div>
  )
}

export default Dashboard