'use client'
import React from 'react'
import { Provider } from 'jotai'
import Map from '@/components/home/MapboxMap'
import '../../styles/App.scss'
import 'mapbox-gl/dist/mapbox-gl.css'
import Bottom from '@/components/home/Bottom'
import Header from '@/components/home/Header'
import LocalisationTracker from '@/components/home/LocalisationTracker'

const Home = () => {
  return (
    <Provider>
      <div className="container-app">
        <Header />
        <LocalisationTracker />
        <Map />
        <Bottom />
      </div>
    </Provider>
  )
}

export default Home
