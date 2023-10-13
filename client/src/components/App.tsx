'use client'
import React, { useState } from 'react'
import GoogleMapSelectedComponent from './GoogleMap'
import CitySelector from './CitySelector'

const MyApp = () => {
  const [selectedCity, setSelectedCity] = useState('')

  const handleSelectCity = (city: React.SetStateAction<string>) => {
    setSelectedCity(city)
    // Utilisez la ville sélectionnée pour effectuer des actions spécifiques
    // comme mettre à jour la carte ou effectuer une recherche associée.
  }

  return (
    <div>
      <h1>Ma Application Google Maps</h1>
      <CitySelector onSelectCity={handleSelectCity} />
      <p>Ville sélectionnée : {selectedCity}</p>
      <GoogleMapSelectedComponent />
    </div>
  )
}

export default MyApp
