import { Routes, Route, Outlet } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import Dashboard from "./pages/dashboard/Dashboard"
import Home from "./pages/home/Home"

function App() {
  const Layout = () => {
    return (
      <div className='page-content'>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    )
  } 

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route path="" element={<Home />} />

        <Route path="dashboard/:imdb_id?" element={<Dashboard />} />

      </Route>
    </Routes>
  )
}

export default App
