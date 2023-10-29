import React, { useEffect } from 'react'
import mapboxgl, { Marker } from 'mapbox-gl'
import { useAtom } from 'jotai'
import {
  barsToVisitAtom,
  latitudeAtom,
  longitudeAtom,
  radiusAtom,
} from '../../state/map/atoms'
import '../../styles/MapboxMap.scss'
import axios from 'axios'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? ''

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

    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    })

    map.addControl(geolocateControl)

    // Fonction pour calculer la distance entre deux points
    function calculateDistance(
      lat1: number,
      lon1: number,
      lat2: number,
      lon2: number,
    ) {
      const R = 6371 // Rayon de la Terre en kilomètres
      const dLat = (lat2 - lat1) * (Math.PI / 180)
      const dLon = (lon2 - lon1) * (Math.PI / 180)
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distance = R * c // Distance en kilomètres
      return distance
    }

    const getBars = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/bars/${latitude}&${longitude}&${radius}`,
        )

        const datas = res.data.data

        // Calculer la distance pour chaque bar
        const barsWithDistance = datas.map(
          (bar: { latitude: string; longitude: string }) => ({
            ...bar,
            distance: calculateDistance(
              latitude,
              longitude,
              parseFloat(bar.latitude),
              parseFloat(bar.longitude),
            ),
          }),
        )

        // Trier les bars par distance croissante
        const sortedBars = barsWithDistance.sort(
          (a: { distance: number }, b: { distance: number }) =>
            a.distance - b.distance,
        )

        // Garder seulement les 3 premiers éléments
        const barsSliced = sortedBars.slice(0, barsToVisit)

        console.log(barsSliced)

        for (const bar of barsSliced) {
          createCustomMarker([bar.longitude, bar.latitude], './assets/beer.svg')
        }

        if (barsSliced.length > 0) {
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

          map.addControl(directions, 'top-left')

          directions.setOrigin([longitude, latitude])

          console.log(barsSliced)

          barsSliced.forEach((bar: { longitude: string; latitude: string }) => {
            const coordinates = [bar.longitude, bar.latitude]
            console.log(directions)

            if (coordinates[0] && coordinates[1]) {
              directions.addWaypoint(
                directions.getWaypoints().length,
                coordinates,
              )
            }

            directions.setOrigin(coordinates)
          })

          // Set the destination for the first bar
          directions.setDestination([
            barsSliced[0].longitude,
            barsSliced[0].latitude,
          ])
        }

        // ...
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

    getBars()
  }, [latitude, longitude, radius, barsToVisit])

  // const closestBar = (position:Array, remainingBars:Array) => {

  // // Met a jour la liste des bar a chaque itération + relancer la fonction d'itinéraire.
  // // Le bar 1 doit savoir quel est le Bar 2 le plus proche pour y aller.
  //   const closestBar =
  //   return closestBar
  // }

  return <div id="map-container" className="map-container"></div>
}

export default MapboxMap
