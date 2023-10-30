'use client'
import Map from '@/components/home/MapboxMap'
import '../../styles/App.scss'
import 'mapbox-gl/dist/mapbox-gl.css'
import Bottom from '@/components/home/Bottom'
import Header from '@/components/home/Header'
import { MapProvider } from 'react-map-gl'

const Home = () => {
  return (
    <div className="container-app">
      <MapProvider>
        <Header />
        <Map />
        <Bottom />
      </MapProvider>
    </div>
  )
}

export default Home
