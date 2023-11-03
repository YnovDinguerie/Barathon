'use client'
import React from 'react'
import { Provider } from 'jotai'
import Header from './Header'
import Bottom from './Bottom'
import '../../styles/App.scss'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxMap from './MapboxMap'
import LocalisationTracker from './LocalisationTracker'

const MyApp = () => {
  return (
    <Provider>
      <div className="container-app">
        <Header></Header>
        <LocalisationTracker />
        <MapboxMap />
        <Bottom />
      </div>
    </Provider>
  )
}

export default MyApp
