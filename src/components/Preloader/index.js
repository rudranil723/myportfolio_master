import { useEffect, useState } from 'react'
import './index.scss'
import rocketImg from '../../assets/images/rocket.png'

const Preloader = ({ onEnter }) => {
  const [isLaunching, setIsLaunching] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  const handleLaunch = () => {
    setIsLaunching(true)

    setTimeout(() => {
      onEnter()
    }, 1700)
  }

  return (
    <div className={`rocket-preloader ${isLaunching ? 'launching' : ''}`}>
      <div className="stars stars-one"></div>
      <div className="stars stars-two"></div>
      <div className="stars stars-three"></div>
      <div className="nebula nebula-one"></div>
      <div className="nebula nebula-two"></div>

      <div className="preloader-content">
        <p className="small-tag">WELCOME TO MY UNIVERSE</p>
        <h1>Rudranil Portfolio</h1>
        <p className="sub-text">
          Launch into my world of web development, projects, and creative builds.
        </p>

        <div className="rocket-wrap">
          <div className="rocket-glow"></div>
          <img src={rocketImg} alt="Rocket" className="rocket-img" />
          <div className="rocket-flame flame-core"></div>
          <div className="rocket-flame flame-outer"></div>
        </div>

        <button className="launch-btn" onClick={handleLaunch} disabled={isLaunching}>
          {isLaunching ? 'Launching...' : 'Launch Portfolio'}
        </button>

        <p className={`enter-hint ${showHint ? 'visible' : ''}`}>
          Press the button to enter
        </p>
      </div>

      <div className="screen-flash"></div>
    </div>
  )
}

export default Preloader