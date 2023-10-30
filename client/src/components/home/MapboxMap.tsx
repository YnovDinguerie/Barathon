'use client'

import Map, {
  Marker,
  GeolocateControl,
  NavigationControl,
  FullscreenControl,
  Source,
  Layer,
} from 'react-map-gl'
import type { LineLayer } from 'mapbox-gl'
import { useAtom } from 'jotai'
import { barsToVisitAtom, radiusAtom } from '../../state/map/atoms'
import '../../styles/MapboxMap.scss'
import { useLocalisationTracker } from './useLocalisationTracker'
import { useQuery } from 'react-query'
import getBars from '@/app/api/home/getBars'
import CustomMarker from './Marker'
import { BordeauxLatitude, BordeauxLongitude } from '@/constant'
import getDirections from '@/app/api/home/getDirections'
import type { FeatureCollection } from 'geojson'

const MapboxMap = () => {
  const [radius] = useAtom(radiusAtom)
  const [barsToVisit] = useAtom(barsToVisitAtom)

  const { latitude, longitude } = useLocalisationTracker()

  // const { data: bars, error } = useQuery({
  //   queryFn: () =>
  //     getBars({
  //       latitude: latitude,
  //       longitude: longitude,
  //       radius: radius,
  //       barsToVisit: barsToVisit,
  //     }),
  // })

  const { data: direction } = useQuery({
    queryFn: () =>
      getDirections({
        pointA: {
          longitude: -0.57699,
          latitude: 44.84138,
        },
        pointB: {
          longitude: -0.5775018,
          latitude: 44.8389801,
        },
        service: 'cycling',
      }),
  })

  // console.log(direction)

  // if (error) {
  //   console.log(error)
  // }

  // const onClickMap = (event: MapLayerMouseEvent) => {
  //   const coords = Object.entries(event.lngLat).map((key) => event.lngLat[key])
  //   const end = {
  //     type: 'FeatureCollection',
  //     features: [
  //       {
  //         type: 'Feature',
  //         properties: {},
  //         geometry: {
  //           type: 'Point',
  //           coordinates: coords,
  //         },
  //       },
  //     ],
  //   }
  // }

  const geojson: FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: direction,
        },
      },
    ],
  }

  // Route Style
  const lineStyle: LineLayer = {
    id: 'roadlayer',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': 'blue',
      'line-width': 4,
      'line-opacity': 0.75,
    },
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
        // onClick={onClickMap}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        <CustomMarker longitude={longitude} latitude={latitude} />
        <CustomMarker longitude={-0.57699} latitude={44.84138} />
        {/* {bars &&
          bars.map((bar, index: number) => (
            <Marker
              key={`bar-${index}`}
              longitude={bar.longitude}
              latitude={bar.latitude}
            />
          ))} */}
        <Source id="routeSource" type="geojson" data={geojson}>
          <Layer {...lineStyle} />
        </Source>
        <NavigationControl />
        <FullscreenControl />
      </Map>
    </div>
  )
}

export default MapboxMap
