import { useParams } from 'react-router-dom'
import styles from './dashboard.module.css'
import { useEffect } from 'react'
import { useShowDetailsStore } from '../../store/showDetailsStore'
import TopEpisodes from '../../components/topEpisodes/TopEpisodes'
import TopCredits from '../../components/topCredits/TopCredits'
import ParentalGuide from '../../components/parentalGuide/ParentalGuide'
import PieChartReusable from '../../componentsReusable/pieChartReusable/PieChartReusable'
import ShowCard from '../../components/showCard/ShowCard'
import BarChartBox from '../../components/barChartBox/BarChartBox'
import SimpleAreaChartBox from '../../components/simpleAreChartBox/SimpleAreChartBox'

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
    credits,
    fetchShowData
  } = useShowDetailsStore( state => state )

  useEffect(() => {
    fetchShowData(imdb_id)
  }, [imdb_id])

  const directorsSliced = credits.directors.slice(0, 5)
  const directorsForPieChart = directorsSliced.map( director => {
    return { 
      name: director.name,
      value: director.episodes_count
    }
  })

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
        <PieChartReusable {...pieChartBoxData} /> 
      </div>

      <div className={`${styles.box} ${styles.box2}`}>
        <BarChartBox />
      </div>

            
      <div className={`${styles.box} ${styles.box2}`}>
        <ParentalGuide />
      </div>

      <div className={`${styles.box} ${styles.box2}`}>
        <SimpleAreaChartBox />
      </div>

    </div>
  )
}

export default Dashboard