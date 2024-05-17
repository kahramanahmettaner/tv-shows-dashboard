import { useParams } from 'react-router-dom'
import styles from './dashboard.module.css'
import { useEffect } from 'react'
import { useShowDetailsStore } from '../../store/showDetailsStore'
import TopEpisodes from '../../components/topEpisodes/TopEpisodes'
import TopCredits from '../../components/topCredits/TopCredits'

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
    fetchParentalGuide, parental_guide,
    show_name, seasons_count, fetchShowDetails,
    fetchEpisodes,
    fetchCredits
  } = useShowDetailsStore( state => state )
  
  useEffect(() => {
    fetchParentalGuide(imdb_id)

    fetchShowDetails(imdb_id)

    // to test the function: fetch the episodes of the first season of the tv show specified by imdb_id
    fetchEpisodes(imdb_id, 1)

    fetchCredits(imdb_id)

  }, [imdb_id])

  useEffect(() => {
    console.log(parental_guide)
  }, [parental_guide])

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
      
    </div>
  )
}

export default Dashboard