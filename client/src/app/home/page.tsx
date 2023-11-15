'use client'
import Popup from '@/components/Popup'
import Bottom from '@/components/home_component/Bottom'
import Header from '@/components/home_component/Header'
import LocalisationTracker from '@/components/home_component/LocalisationTracker'
import Map from '@/components/home_component/MapboxMap'
import { Provider } from 'jotai'
import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useEffect, useState } from 'react'
import '../../styles/App.scss'

const Home: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const resetTime = 200
  const resetCounter = () => {
    setClickCount(0)
  }
  useEffect(() => {
    let resetTimeout: NodeJS.Timeout

    const handleClick = () => {
      if (!isPopupOpen) {
        setClickCount((prevCount) => prevCount + 1)

        if (clickCount === 3) {
          clearTimeout(resetTimeout)
          openPopup()
          resetTimeout = setTimeout(() => {
            setClickCount(0)
          }, resetTime)
        }
      }
    }

    document.addEventListener('click', handleClick)
    resetTimeout = setTimeout(resetCounter, resetTime)

    return () => {
      document.removeEventListener('click', handleClick)
      if (resetTimeout) {
        clearTimeout(resetTimeout)
      }
    }
  }, [isPopupOpen, clickCount, resetTime])

  const openPopup = () => {
    setIsPopupOpen(true)
    setClickCount(-1)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
  }

  return (
    <Provider>
      <div className="container-app">
        <Header />
        <Popup isOpen={isPopupOpen} onRequestClose={closePopup} />
        <LocalisationTracker />
        <Map />
        <Bottom />
      </div>
    </Provider>
  )
}

export default Home
