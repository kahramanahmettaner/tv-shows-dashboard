import { useParams } from 'react-router-dom'
import styles from './dashboard.module.css'
import { useEffect } from 'react'
import { useShowDetailsStore } from '../../store/showDetailsStore'
import TopEpisodes from '../../components/topEpisodes/TopEpisodes'
import TopCredits from '../../components/topCredits/TopCredits'
import ParentalGuide from '../../components/parentalGuide/ParentalGuide'
import BarChartReusable from '../../components/barChartReusable/BarChartReusable'
import PieChartReusable from '../../components/pieChartReusable/PieChartReusable'
import SimpleAreaChartReusable from '../../components/simpleAreaChartReusable/SimpleAreaChartReusable'
import ShowCard from '../../components/showCard/ShowCard'

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
    episodes,
    credits,
    fetchShowData
  } = useShowDetailsStore( state => state )


  useEffect(() => {
    fetchShowData(imdb_id)
  }, [imdb_id])

  // get first season episodes only and in the format like episodesForAreaChart
  // TODO: somehow season_number is not integer. but fix this and then use === here, instead ==
  const episodesForBarChart = episodes.filter((episode) => episode.season_number == 1).map((episode) => ({
    name: `Season ${episode.season_number} Episode ${episode.episode_number}`,
    imdb_rating: episode.imdb_rating,
  }));

  const episodesForAreaChart = episodes.map( episode => {
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

  const areaChartBoxData = {
    title: "All Episodes",
    color: "#FF8042",
    dataKey: "imdb_rating",
    chartData: episodesForAreaChart
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
        <BarChartReusable {...barChartBoxData} /> 
      </div>

            
      <div className={`${styles.box} ${styles.box2}`}>
        <ParentalGuide />
      </div>

      <div className={`${styles.box} ${styles.box2}`}>
        <SimpleAreaChartReusable {...areaChartBoxData} /> 
      </div>

    </div>
  )
}

export default Dashboard