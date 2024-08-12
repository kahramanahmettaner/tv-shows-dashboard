import { Routes, Route, Outlet } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import Dashboard from "./pages/dashboard/Dashboard"
import Home from "./pages/home/Home"
import Dropdown from "./components/dropdown/Dropdown"
import { useState } from "react"

function App() {

  const items = ["item1", "item2", "item3"];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const Layout = () => {
    return (
      <div className='page-content'>
        <Navbar />
        <Outlet />

        {selectedIndex}
        <Dropdown 
          dropdownItems={items}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />

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
