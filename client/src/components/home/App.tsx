'use client'
import React from 'react'
import Header from './Header'
import Map from './MapboxMap'
import Bottom from './Bottom'
import '../../styles/App.scss'

const MyApp = () => {
  return (
    <div className="">
      <Header></Header>
      <Map />
      <Bottom />
    </div>
  )
}

export default MyApp
