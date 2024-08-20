import { useParams } from 'react-router-dom'
import styles from './dashboard.module.css'
import { useEffect } from 'react'
import { useShowDetailsStore } from '../../store/showDetailsStore'
import TopEpisodes from '../../components/topEpisodes/TopEpisodes'
import TopCredits from '../../components/topCredits/TopCredits'
import ParentalGuide from '../../components/parentalGuide/ParentalGuide'
import ShowCard from '../../components/showCard/ShowCard'
import BarChartBox from '../../components/barChartBox/BarChartBox'
import SimpleAreaChartBox from '../../components/simpleAreChartBox/SimpleAreChartBox'
import PieChartBox from '../../components/pieChartBox/PieChartBox'

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
    fetchShowData
  } = useShowDetailsStore( state => state )

  useEffect(() => {
    fetchShowData(imdb_id)
  }, [imdb_id])

  return (
    <div className={styles.dashboard}>

      <div className={`${styles.box} ${styles.box1}`}>
        <TopEpisodes />
      </div>
      <div 
        className={`${styles.box}`} 
        style={{ gridColumn: 'span 2', gridRow: 'span 1' }}>
        <ShowCard />
      </div>

      {/* <div className={`${styles.box} ${styles.box2}`}>Showname: {show_name}, Seasons Count: {seasons_count}</div>
      <div className={`${styles.box} ${styles.box3}`}>IMDB Rating: {imdb_rating}, Actors: {actors}, Description: {description}, Year: {year}, </div> */}
      <div className={`${styles.box} ${styles.box4}`}>
        <TopCredits />
      </div>
      
      <div className={`${styles.box} ${styles.box2}`}>
        <BarChartBox />
      </div>

      <div className={`${styles.box} ${styles.box2}`}>
        <SimpleAreaChartBox />
      </div>
            
      <div className={`${styles.box} ${styles.box2}`}>
        <ParentalGuide />
      </div>
      
      <div className={`${styles.box} ${styles.box2}`}>
        <PieChartBox />
      </div>
    </div>
  )
}

export default Dashboard