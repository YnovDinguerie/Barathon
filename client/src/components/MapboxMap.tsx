import React, { useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import { useAtom } from 'jotai'
import { latitudeAtom, longitudeAtom } from './atoms'
import './MapboxMap.scss'

mapboxgl.accessToken =
  'pk.eyJ1IjoiZXhvc2xhc2gzMyIsImEiOiJjbG53dTkzcGgwOXRnMmpsZWplcXIxeGt1In0.vE7rIXLdqq640qg8Otz2Pw'

const MapboxMap = () => {
  const [latitude] = useAtom(latitudeAtom)
  const [longitude] = useAtom(longitudeAtom)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude, latitude],
      zoom: 12,
    })

    // Ajouter le contrôle de géolocalisation
    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    })

    map.addControl(geolocateControl)

    // ... le reste du code

    return () => {
      // Nettoyer les ressources lorsque le composant est démonté
      map.remove()
    }
  }, [latitude, longitude])

  return <div id="map-container" className="map-container"></div>
}

export default MapboxMap
