import axios from 'axios'

type BarsType = {
  latitude: number
  longitude: number
  radius: number
  barsToVisit: number
}

//Fonction pour calculer la distance entre deux points
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
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

export default async function getBars({
  latitude,
  longitude,
  radius,
  barsToVisit,
}: BarsType): Promise<{ longitude: number; latitude: number }[]> {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/bars/${latitude}&${longitude}&${radius}`,
  )

  console.log('hello')
  // Calculer la distance pour chaque bar
  const barsWithDistance: {
    longitude: number
    latitude: number
    distance: number
  }[] = response.data.map((bar: { latitude: string; longitude: string }) => ({
    ...bar,
    distance: calculateDistance(
      latitude,
      longitude,
      parseFloat(bar.latitude),
      parseFloat(bar.longitude),
    ),
  }))

  // Trier les bars par distance croissante
  const sortedBars = barsWithDistance.sort(
    (a: { distance: number }, b: { distance: number }) =>
      a.distance - b.distance,
  )

  // Garder seulement les 3 premiers éléments
  const barsSliced = sortedBars.slice(0, barsToVisit)
  return barsSliced
}
