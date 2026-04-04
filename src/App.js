import './App.scss'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/layout'
import Home from './components/home'
import About from './components/About'
import Portfolio from './components/portfolio'
import Contact from './components/contact'
import Preloader from './components/Preloader'

function App() {
  const [showPreloader, setShowPreloader] = useState(true)

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout showPreloader={showPreloader} />}
      >
        <Route
          index
          element={
            showPreloader ? (
              <Preloader onEnter={() => setShowPreloader(false)} />
            ) : (
              <Home />
            )
          }
        />
        <Route path="about" element={<About />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}

export default App