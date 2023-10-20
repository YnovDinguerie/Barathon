import React, { useEffect } from 'react'
import mapboxgl, { LngLatLike, Marker } from 'mapbox-gl'
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

    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    })

    map.addControl(geolocateControl)

    const createCustomMarker = (lngLat: any, imagePath: any) => {
      const markerElement = document.createElement('div')
      markerElement.className = 'custom-marker'
      const markerImg = document.createElement('img')
      markerImg.src = imagePath
      markerElement.appendChild(markerImg)

      return new Marker(markerElement).setLngLat(lngLat).addTo(map)
    }

    createCustomMarker([longitude, latitude], './assets/beer.svg')
    createCustomMarker([longitude + 0.01, latitude + 0.01], './assets/beer.svg')
    createCustomMarker(
      [longitude + 0.012, latitude + 0.012],
      './assets/beer.svg',
    )
    createCustomMarker(
      [longitude + 0.0112, latitude + 0.0132],
      './assets/beer.svg',
    )
    createCustomMarker(
      [longitude + 0.0112, latitude + 0.0122],
      './assets/beer.svg',
    )


    return () => {
      map.remove()
    }
  }, [latitude, longitude])

  return <div id="map-container" className="map-container"></div>
}

export default MapboxMap
