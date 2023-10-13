'use client'
import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { createContext } from 'react'

//const Context = createContext()

const containerStyle = {
  width: '400px',
  height: '400px',
}

const center = {
  lat: 40.7128, // Latitude
  lng: -74.006, // Longitude
}

const GoogleMapComponent = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDP6jb25pHnH3C3PhgYqT2C2oIXD4oCwkk">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Vous pouvez ajouter des marqueurs ici */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  )
}

export default GoogleMapComponent
