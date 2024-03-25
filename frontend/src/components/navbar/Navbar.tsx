import styles from './navbar.module.css'

const Navbar = () => {
  return (
    <div className={styles.navbar}>

      <div className={styles.logo}>
        <span>TV Shows Dashboard</span>
      </div>

      <div className={styles.icons}>
        <img src='/search.svg' alt='' className={styles.icon}/>
        <img src='/app.svg' alt='' className={styles.icon}/>
        <div className={styles.user} >
          <img src='/' alt='' className={styles.icon}/>
          <span>Jane Doe</span>
        </div>
        <img src='/settings.svg' alt='' className={styles.icon}/>
      </div>

    </div>
  )
}

export default Navbar