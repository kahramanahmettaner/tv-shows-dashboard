import { Routes, Route, Outlet } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"

function App() {

  const Layout = () => {
    return (
      <div className='main'>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    )
  } 

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route path="" element={<h1>App</h1>} />

      </Route>
    </Routes>
  )
}

export default App
