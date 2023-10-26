'use client'
import React from 'react'
import { Provider } from 'jotai'
import LocalisationTracker from './LocalisationTracker'
import Header from './Header'
import Map from './MapboxMap'
import Bottom from './Bottom'
import './App.scss'
import 'mapbox-gl/dist/mapbox-gl.css'

const MyApp = () => {
  return (
    <Provider>
      <div className="container-app">
        <Header></Header>
        <LocalisationTracker />
        <Map />
        <Bottom />
      </div>
    </Provider>
  )
}

export default MyApp
