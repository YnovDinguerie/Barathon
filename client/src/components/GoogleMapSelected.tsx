import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

const containerStyle = {
  width: '400px',
  height: '400px',
}

interface GoogleMapComponentProps {
  selectedCity: string
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  selectedCity,
}) => {
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral | null>(
    null,
  )

  useEffect(() => {
    if (selectedCity) {
      const geocoder = new google.maps.Geocoder() // Initialisation du géocodeur

      geocoder.geocode({ address: selectedCity }, (results, status) => {
        if (
          status === 'OK' &&
          results &&
          results[0] &&
          results[0].geometry &&
          results[0].geometry.location
        ) {
          setMapCenter(results[0].geometry.location.toJSON()) // Convertir en LatLngLiteral
        }
      })
    }
  }, [selectedCity])

  return (
    <LoadScript googleMapsApiKey="AIzaSyDP6jb25pHnH3C3PhgYqT2C2oIXD4oCwkk">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter as google.maps.LatLngLiteral} // Effectuer un type casting
        zoom={10}
      />
    </LoadScript>
  )
}

export default GoogleMapComponent
