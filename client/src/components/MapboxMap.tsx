import React, { useEffect } from 'react'
import mapboxgl, { Marker } from 'mapbox-gl'
import { useAtom } from 'jotai'
import { latitudeAtom, longitudeAtom } from './atoms'
import './MapboxMap.scss'
import axios from 'axios'

mapboxgl.accessToken =
  'pk.eyJ1IjoiZXhvc2xhc2gzMyIsImEiOiJjbG53dTkzcGgwOXRnMmpsZWplcXIxeGt1In0.vE7rIXLdqq640qg8Otz2Pw'

export const getBars = async (
  latitude: number | string,
  longitude: number | string,
  radiusBars: number | string,
) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/bars/${latitude}&${longitude}&${radiusBars}`,
    )

    const datas = res.data.data
    for (const data of datas) {
      createCustomMarker([data.longitude, data.latitude], './assets/beer.svg')
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const createCustomMarker = (lngLat: any, imagePath: any) => {
  const markerElement = document.createElement('div')
  markerElement.className = 'custom-marker'
  const markerImg = document.createElement('img')
  markerImg.src = imagePath
  markerElement.appendChild(markerImg)

  return new Marker(markerElement).setLngLat(lngLat).addTo(map)
}

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

    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    })

    map.addControl(geolocateControl)

    return () => {
      map.remove()
    }
  }, [latitude, longitude])

  return <div id="map-container" className="map-container"></div>
}

export default MapboxMap
