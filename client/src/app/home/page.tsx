'use client'
import React, { useState, useEffect } from 'react'
import { Provider } from 'jotai'
import Map from '@/components/home/MapboxMap'
import '../../styles/App.scss'
import 'mapbox-gl/dist/mapbox-gl.css'
import Bottom from '@/components/home/Bottom'
import Header from '@/components/home/Header'
import LocalisationTracker from '@/components/home/LocalisationTracker'
import Popup from '@/components/Popup'

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
