import React, { useEffect } from 'react'
import { useSetAtom } from 'jotai'
import { latitudeAtom, longitudeAtom } from '../../state/map/atoms'

const LocalisationTracker = () => {
  const setLatitude = useSetAtom(latitudeAtom)
  const setLongitude = useSetAtom(longitudeAtom)

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
          },
          (error) => {
            console.error('Error getting location:', error)
          },
        )
      } else {
        console.error('Geolocation is not supported by your browser.')
      }
    }

    getLocation()

    // Update location every 5 minutes (adjust as needed)
    const intervalId = setInterval(getLocation, 1 * 60 * 1000)

    // Clear interval on component unmount
    return () => clearInterval(intervalId)
  }, [setLatitude, setLongitude]) // Empty dependency array means this effect runs once when the component mounts

  return <div></div>
}

export default LocalisationTracker
