import axios from 'axios'

type DirectionProps = {
  pointA: {
    longitude: number
    latitude: number
  }
  pointB: {
    longitude: number
    latitude: number
  }
  service: 'walking' | 'cycling' | 'driving'
}

type DirectionResponse = { longitude: number; latitude: number }

export default async function getDirections({
  pointA,
  pointB,
  service,
}: DirectionProps): Promise<DirectionResponse[][]> {
  const url = `https://api.mapbox.com/directions/v5/mapbox/${service}/${pointA.longitude},${pointA.latitude};${pointB.longitude},${pointB.latitude}?steps=true&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
  const response = await axios.get(url)
  console.log(response.data)
  const coords = response.data.routes[0].geometry.coordinates
  return coords
}
