/* eslint-disable prettier/prettier */
import axios from 'axios'
import config from './config'
import mapboxgl from 'mapbox-gl'

export const apiFetch = (method: string, path: string, data: object = {}) => {
  let headers = {}
  if (localStorage.user) {
    headers = {
      Authorization: `Bearer ${JSON.parse(localStorage.user).token}`,
    }
  } else {
    headers = {}
  }
  return axios({
    method: method,
    url: config.backendApiUrl + path,
    data: data,
    headers: headers,
  })
}

export const reverseGeocode = async (longitude: number, latitude: number) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`,
    )

    if (!response.ok) {
      throw new Error('Erreur de réseau ou de requête')
    }

    const data = await response.json()

    if (data.features.length === 0) {
      throw new Error('Aucun résultat trouvé')
    }

    const address = data.features[0].place_name
    return address
  } catch (error) {
    console.error('Erreur de géocodage inverse')
    return null
  }
}
