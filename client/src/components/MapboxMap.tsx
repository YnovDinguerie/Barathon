import React, { useEffect, useRef } from 'react'
import mapboxgl, { Marker } from 'mapbox-gl'
import { useAtom } from 'jotai'
import {
  barsToVisitAtom,
  latitudeAtom,
  longitudeAtom,
  radiusAtom,
} from './atoms'
import './MapboxMap.scss'
import axios from 'axios'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

mapboxgl.accessToken =
  'pk.eyJ1IjoiZXhvc2xhc2gzMyIsImEiOiJjbG53dTkzcGgwOXRnMmpsZWplcXIxeGt1In0.vE7rIXLdqq640qg8Otz2Pw'

const MapboxMap = () => {
  const [latitude] = useAtom(latitudeAtom)
  const [longitude] = useAtom(longitudeAtom)
  const [radius] = useAtom(radiusAtom)
  const [barsToVisit] = useAtom(barsToVisitAtom)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude, latitude],
      zoom: 12,
    })

    function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371
      const dLat = (lat2 - lat1) * (Math.PI / 180)
      const dLon = (lon2 - lon1) * (Math.PI / 180)
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distance = R * c
      return distance
    }

    const getClosestBar = (position, remainingBars) => {
      let minDistance = Number.MAX_VALUE
      let closestBar = null

      for (const bar of remainingBars) {
        const distance = calculateDistance(
          position[0],
          position[1],
          bar.longitude,
          bar.latitude,
        )
        bar.distanceFromPreviousBar = distance
        if (distance < minDistance) {
          minDistance = distance
          closestBar = bar
        }
      }

      return closestBar
    }

    const getBars = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/bars/${latitude}&${longitude}&${radius}`,
        )

        const datas = res.data.data

        for (const data of datas) {
          data.latitude = parseFloat(data.latitude)
          data.longitude = parseFloat(data.longitude)
        }

        const barsWithDistance = datas.map((bar) => ({
          ...bar,
          distance: calculateDistance(
            latitude,
            longitude,
            bar.latitude,
            bar.longitude,
          ),
        }))

        const sortedBars = barsWithDistance.sort(
          (a, b) => a.distance - b.distance,
        )

        const barsSliced = sortedBars.slice(0, barsToVisit)

        for (const bar of barsSliced) {
          createCustomMarker(
            [parseFloat(bar.longitude), parseFloat(bar.latitude)],
            './assets/beer.svg',
          )
        }

        if (barsSliced.length > 0) {
          const directionsRef = useRef(null) // Créez une référence pour le composant MapboxDirections

          const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/walking',
            controls: {
              instructions: false,
              inputs: false,
              profileSwitcher: false,
            },
          })

          // Stockez la référence dans la variable directionsRef
          directionsRef.current = directions

          map.addControl(directions, 'top-left')

          directions.setOrigin([longitude, latitude])

          console.log(barsSliced)

          let remainingBars = [...barsSliced]
          let currentPosition = [longitude, latitude]

          let i = 0
          while (remainingBars.length > 0) {
            const closestBar = getClosestBar(currentPosition, remainingBars)

            if (closestBar) {
              currentPosition = [closestBar.longitude, closestBar.latitude]
              directions.addWaypoint(i, currentPosition)
              remainingBars = remainingBars.filter((bar) => bar !== closestBar)
            }

            i++
          }

          directions.setDestination(currentPosition)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const createCustomMarker = (lngLat, imagePath) => {
      const markerElement = document.createElement('div')
      markerElement.className = 'custom-marker'
      const markerImg = document.createElement('img')
      markerImg.src = imagePath
      markerElement.appendChild(markerImg)

      return new Marker(markerElement).setLngLat(lngLat).addTo(map)
    }

    getBars()
  }, [latitude, longitude, radius, barsToVisit])

  return <div id="map-container" className="map-container"></div>
}

export default MapboxMap
