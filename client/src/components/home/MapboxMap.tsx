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

    function calculateDistance(
      lat1: number,
      lon1: number,
      lat2: number,
      lon2: number,
    ) {
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
    const getBars = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/bars/${latitude}&${longitude}&${radius}`,
        )

        const datas = res.data.data

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

        const sortedBars = barsWithDistance.sort(
          (a: { distance: number }, b: { distance: number }) =>
            a.distance - b.distance,
        )

        const barsSliced = sortedBars.slice(0, barsToVisit)

        for (const bar of barsSliced) {
          createCustomMarker(
            [parseFloat(bar.longitude), parseFloat(bar.latitude)],
            './assets/beer.svg',
          )
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

          barsSliced.forEach(
            (bar: { longitude: string; latitude: string }, index: number) => {
              const coordinates = [
                parseFloat(bar.longitude),
                parseFloat(bar.latitude),
              ]

              if (coordinates[0] && coordinates[1]) {
                directions.addWaypoint(index, coordinates)
              }
            },
          )

          directions.setDestination([
            parseFloat(barsSliced[0].longitude),
            parseFloat(barsSliced[0].latitude),
          ])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const createCustomMarker = (lngLat: any, imagePath: string) => {
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
