import { useParams } from 'react-router-dom'
import styles from './dashboard.module.css'
import { useEffect } from 'react'
import { useShowDetailsStore } from '../../store/showDetailsStore'
import TopEpisodes from '../../components/topEpisodes/TopEpisodes'
import TopCredits from '../../components/topCredits/TopCredits'
import ParentalGuide from '../../components/parentalGuide/ParentalGuide'
import BarChartReusable from '../../components/barChartReusable/BarChartReusable'
import PieChartReusable from '../../components/pieChartReusable/PieChartReusable'

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
    credits, fetchCredits
  } = useShowDetailsStore( state => state )
  
  useEffect(() => {
    fetchParentalGuide(imdb_id)

    fetchShowDetails(imdb_id)

    // to test the function: fetch the episodes of the first season of the tv show specified by imdb_id
    fetchEpisodes(imdb_id, 1)

    fetchCredits(imdb_id)

  }, [imdb_id])

  const episodesForBarChart = episodes.map( episode => {
    return { 
      name: `Season ${episode.season_number} Episode ${episode.episode_number}`, 
      imdb_rating: episode.imdb_rating  
    }
  })

  const directorsSliced = credits.directors.slice(0, 5)
  const directorsForPieChart = directorsSliced.map( director => {
    return { 
      name: director.name,
      value: director.episodes_count
    }
  })


  const barChartBoxData = {
    title: "Season 1 Episodes",
    color: "#FF8042",
    dataKey: "imdb_rating",
    chartData: episodesForBarChart
  };

  const pieChartBoxData = {
    title: "Directors",
    chartData: directorsForPieChart,
    color: "#FF8042",
    labelTitle: 'Director',
    descriptionTitle: 'Directed Episodes Number'
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
        <PieChartReusable {...pieChartBoxData} /> 
      </div>

      <div className={`${styles.box} ${styles.box2}`}>
        <BarChartReusable {...barChartBoxData} /> 
      </div>

            
      <div className={`${styles.box} ${styles.box2}`}>
        <ParentalGuide />
      </div>

    </div>
  )
}

export default Dashboard