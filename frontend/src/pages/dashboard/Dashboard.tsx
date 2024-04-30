import { useParams } from 'react-router-dom'
import TopBox from '../../components/topBox/TopBox'
import styles from './dashboard.module.css'
import { useEffect } from 'react'
import { useShowDetailsStore } from '../../store/showDetailsStore'
import { getEpisodes } from '../../api'

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
  
  const { show_name, seasons_count, fetchShowDetails } = useShowDetailsStore( state => state )
  
  useEffect(() => {

    fetchShowDetails(imdb_id)

    // to test the function: fetch the episodes of the first season of the tv show specified by imdb_id
    getEpisodes(imdb_id, 1)
    .then( data => console.log(data) )
    .catch( err => console.error(err) )

  }, [imdb_id])

  return (
    <div className={styles.dashboard}>

      <div className={`${styles.box} ${styles.box1}`}>
        <TopBox />
      </div>
      <div className={`${styles.box} ${styles.box2}`}>Showname: {show_name}</div>
      <div className={`${styles.box} ${styles.box3}`}>Seasons Count: {seasons_count}</div>
      <div className={`${styles.box} ${styles.box4}`}>
        <TopBox />
      </div>
      
    </div>
  )
}

export default Dashboard