'use client'

import Map, { Marker } from 'react-map-gl'
import { useAtom } from 'jotai'
import { barsToVisitAtom, radiusAtom } from '../../state/map/atoms'
import '../../styles/MapboxMap.scss'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useLocalisationTracker } from './useLocalisationTracker'
import { useQuery } from 'react-query'
import getBars from '@/app/api/home/getBars'

const MapboxMap = () => {
  const [radius] = useAtom(radiusAtom)
  const [barsToVisit] = useAtom(barsToVisitAtom)

  const coordinates = useLocalisationTracker()

  const { data: bars, error } = useQuery({
    queryFn: () =>
      getBars({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        radius: radius,
        barsToVisit: barsToVisit,
      }),
  })

  if (error) {
    console.log(error)
  }

  return (
    <div className="map-container">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        zoom={12}
        {...coordinates}
      >
        <Marker
          longitude={coordinates.longitude}
          latitude={coordinates.latitude}
          color="red"
        />
        <Marker longitude={44} latitude={-0.5} color="blue" />
        {bars &&
          bars.map((bar, index: number) => (
            <Marker
              key={`bar-${index}`}
              longitude={bar.longitude}
              latitude={bar.latitude}
            />
          ))}
      </Map>
    </div>
  )
}

export default MapboxMap
