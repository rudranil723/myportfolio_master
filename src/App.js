import './App.scss'
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loader from 'react-loaders'

import Layout from './components/layout'
import Home from './components/home'
import About from './components/About'
import Portfolio from './components/portfolio'
import Contact from './components/contact'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2200)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="page-loader">
        <div className="loader-content">
          <h1>Rudranil</h1>
          <p>Building cool web experiences...</p>
          <Loader type="pacman" />
        </div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  )
}

export default App