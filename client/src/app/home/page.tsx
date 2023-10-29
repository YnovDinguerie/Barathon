'use client'
import Map from '@/components/home/MapboxMap'
import '../../styles/App.scss'
import Bottom from '@/components/home/Bottom'
import Header from '@/components/home/Header'

const Home = () => {
  return (
    <div className="container-app">
      <Header />
      <Map />
      <Bottom />
    </div>
  )
}

export default Home
