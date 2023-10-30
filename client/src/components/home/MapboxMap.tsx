'use client'

import Map, {
  Marker,
  GeolocateControl,
  NavigationControl,
  FullscreenControl,
} from 'react-map-gl'
import { useAtom } from 'jotai'
import { barsToVisitAtom, radiusAtom } from '../../state/map/atoms'
import '../../styles/MapboxMap.scss'
import { useLocalisationTracker } from './useLocalisationTracker'
import { useQuery } from 'react-query'
import getBars from '@/app/api/home/getBars'
import CustomMarker from './Marker'
import { BordeauxLatitude, BordeauxLongitude } from '@/constant'

const MapboxMap = () => {
  const [radius] = useAtom(radiusAtom)
  const [barsToVisit] = useAtom(barsToVisitAtom)

  const { latitude, longitude } = useLocalisationTracker()

  const { data: bars, error } = useQuery({
    queryFn: () =>
      getBars({
        latitude: latitude,
        longitude: longitude,
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
        initialViewState={{
          longitude: BordeauxLongitude,
          latitude: BordeauxLatitude,
          zoom: 10,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        <CustomMarker longitude={longitude} latitude={latitude} />
        <CustomMarker longitude={-0.57699} latitude={44.84138} />
        {bars &&
          bars.map((bar, index: number) => (
            <Marker
              key={`bar-${index}`}
              longitude={bar.longitude}
              latitude={bar.latitude}
            />
          ))}
        <NavigationControl />
        <FullscreenControl />
      </Map>
    </div>
  )
}

export default MapboxMap
