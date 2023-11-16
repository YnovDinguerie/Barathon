import React, { useEffect, useState } from 'react'
import '../../styles/Bottom.scss'
import RangeInput from '../Input/RangeInput'
import { useAtom } from 'jotai'
import {
  barsToVisitAtom,
  latitudeAtom,
  longitudeAtom,
  radiusAtom,
  resizeMapAtom,
  startBarathonAtom,
} from '../../state/map/atoms'
import Image from 'next/image'
import '../../styles/Filter.scss'
import mapboxgl from 'mapbox-gl'
import { apiFetch } from '@/app/api/utils'

const Bottom = () => {
  const [setupBarathon, setSetupBarathon] = useState(false)
  const [startBarathon, setStartBarathon] = useAtom(startBarathonAtom)
  const [barsToVisit, setBarsToVisit] = useAtom(barsToVisitAtom)
  const [radiusBars, setRadiusBars] = useAtom(radiusAtom)
  const [longitude, setLongitude] = useAtom(longitudeAtom)
  const [latitude, setLatitude] = useAtom(latitudeAtom)
  const [resizeMap, setresizeMap] = useAtom(resizeMapAtom)
  const [seconds, setSeconds] = useState(0)
  const [searchBars, setSearchBars] = useState<[any]>()
  const [allFavoriteBars, setAllFavoriteBars] = useState([])

  const distanceRound = (nombre: number) => {
    const partieDecimale = nombre - Math.floor(nombre)
    return Math.round(nombre + partieDecimale)
  }

  const addFavorite = (barID: string) => {
    const data = {
      bar_id: barID,
    }

    apiFetch('POST', '/favorite-bars/', data).then((response) => {
      console.log(response)
    })
  }

  const deleteFavoriteBar = (barID: string) => {
    console.log(barID)
    apiFetch('DELETE', `/favorite-bars/${barID}`).then((response) => {
      console.log(response)
      setAllFavoriteBars(allFavoriteBars.filter((x) => x.id !== barID))
    })
  }

  const startDestination = (bar) => {
    console.log(bar)

    const userConfirmed = window.confirm(
      'Lancer la navigation sur Google Maps ?',
    )

    if (userConfirmed) {
      // Code à exécuter si l'utilisateur a cliqué sur "OK"
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${bar.bar.latitude},${bar.bar.longitude}`

      // Redirigez l'utilisateur vers Google Maps
      window.location.href = googleMapsUrl
    } else {
      // Code à exécuter si l'utilisateur a cliqué sur "Annuler"
      alert('Navigation annulée.')
    }
  }

  const destinationInput = () => {
    var barName = document.getElementById('destinationInput').value

    if (barName.trim() !== '') {
      var apiUrl = `http://127.0.0.1:8000/api/bars-search/${latitude}&${longitude}&${barName}`

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const barsWithAddresses = []

          Promise.all(
            data.data.map(async (bar) => {
              const address = await reverseGeocode(bar.longitude, bar.latitude)
              barsWithAddresses.push({ ...bar, address })
            }),
          )
            .then(() => {
              setSearchBars(barsWithAddresses)
              console.log(barsWithAddresses)
            })
            .catch((error) => {
              console.error('Erreur de géocodage inversé:', error)
            })
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      setSearchBars([])
    }
  }

  const [isLoading, setIsLoading] = useState(true)
  const getfavoriteBar = async () => {
    setIsLoading(true)
    const res = await apiFetch('GET', '/favorite-bars/')

    const bars = res.data.data
    bars.map(
      async (bar) =>
        (bar.bar.address = await reverseGeocode(
          bar.bar.longitude,
          bar.bar.latitude,
        )),
    )
    console.log(bars)
    setAllFavoriteBars(bars)
    setresizeMap(!resizeMap)
    setIsLoading(false)
  }
  useEffect(() => {
    getfavoriteBar()
  }, [])

  useEffect(() => {
    if (searchBars && searchBars.length > 0) {
      openResultSearch()
    } else {
      closeResultSearch()
    }
  }, [searchBars])

  const minutes = Math.floor(seconds / 60)
  const secondes = seconds % 60

  useEffect(() => {
    if (startBarathon) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1)
      }, 1000)

      return () => clearInterval(intervalId)
    } else {
      setSeconds(0)
    }
  }, [startBarathon])

  const setupBarathonFunction = () => {
    setSetupBarathon(true)
    setresizeMap(!resizeMap)
  }

  const startBarathonFunction = () => {
    setSetupBarathon(false)
    setStartBarathon(true)
    setresizeMap(!resizeMap)
  }

  const backToMenu = () => {
    setSetupBarathon(false)
    setresizeMap(!resizeMap)
  }

  const stopGame = () => {
    setSetupBarathon(false)
    setStartBarathon(false)
    setresizeMap(!resizeMap)
  }

  async function reverseGeocode(longitude: number, latitude: number) {
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

  const searchBar = document.querySelector('.search-bar')

  function openResultSearch() {
    if (searchBar) {
      searchBar.classList.add('menu-opened')
    }
  }

  function closeResultSearch() {
    if (searchBar) {
      searchBar.classList.remove('menu-opened')
    }
  }

  const handleRangeBarNumberChange = (barsToVisit: number) => {
    setBarsToVisit(barsToVisit)
  }

  const handleRangeRadiusChange = (barsRadius: number) => {
    setRadiusBars(barsRadius)
  }

  let content

  if (setupBarathon) {
    content = (
      <div>
        <h1 className="title">Démarrer le Barathon</h1>
        <h2 className="section">Nombre de bars à visiter</h2>
        <div className="container-slider">
          <RangeInput
            min={2}
            max={10}
            onRangeChange={handleRangeBarNumberChange}
          />
          <p className="number-information">{barsToVisit} bars </p>
        </div>
        <h2 className="section">Rayon du Barathon (en km)</h2>
        <div className="container-slider">
          <RangeInput
            min={2}
            max={10}
            onRangeChange={handleRangeRadiusChange}
          />
          <p className="number-information">{radiusBars} km </p>
        </div>
        <button
          onClick={startBarathonFunction}
          className="bg-orange text-white start-barathon"
        >
          Démarrer la partie
        </button>

        <div className="container-back-menu">
          <Image
            src="/assets/arrow-left.svg"
            alt="back to menu"
            className="back-menu"
            width={20}
            height={20}
          />
          <p onClick={backToMenu} className="text-back-menu">
            Revenir en arrière
          </p>
        </div>
      </div>
    )
  } else if (startBarathon) {
    content = (
      <div>
        <div className="section-container">
          <div>
            <p className="section-title">Temps total</p>
            <p className="total-time">
              {minutes} min {secondes}
            </p>
          </div>
          <div onClick={stopGame} className="container-button-game">
            <Image
              src="/assets/stop.svg"
              alt="stop"
              className="stop-image"
              width={20}
              height={20}
            />
            <p className="count-element">Arrêter</p>
          </div>
          <div>
            <p className="section-title">Bars restant</p>
            <div className="container-bar-left">
              <Image
                src="/assets/beer2.svg"
                alt="bars left"
                width={20}
                height={20}
              />
              <p className="count-bar-left"> {barsToVisit} </p>
            </div>
          </div>
        </div>
        <div className="loading-bar"></div>
      </div>
    )
  } else {
    content = (
      <div>
        <div className="filter-container">
          <Image
            src="/assets/search.svg"
            alt="search icon"
            width={20}
            height={20}
            onClick={() => destinationInput()}
          />
          <input type="text" id="destinationInput" placeholder="Où va t-on ?" />

          <div className="search-bar">
            {searchBars && (
              <div>
                <div className="close-item">
                  <img
                    onClick={closeResultSearch}
                    src="/assets/close.svg"
                    alt="close"
                  />
                </div>
                {searchBars.map((bar) => (
                  <div className="result-bar-container" key={bar.id}>
                    <div className="container-img-bar-name-address">
                      <div
                        onClick={() => addFavorite(bar.id)}
                        className="img-favorite"
                      >
                        <img
                          src="/assets/favorite.svg"
                          alt="Add to favorite"
                        ></img>
                      </div>
                      <div>
                        <div className="bar-name">{bar.name}</div>
                        <div className="bar-min-size">{bar.address}</div>
                      </div>
                    </div>
                    <div className="bar-min-size">
                      {distanceRound(bar.distance)} Km
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {allFavoriteBars.length > 0 ? (
          <h2 className="section"> Favories </h2>
        ) : (
          <p className="start-add-favorite">
            Commencer par ajouter des favories à l'aide de la barre de recherche
          </p>
        )}
        {!isLoading ? (
          <div className="favorites-bar-container">
            {allFavoriteBars.map((bar, index) => (
              <div
                onClick={() => startDestination(bar)}
                key={index}
                className="section-container"
              >
                <Image
                  src="/assets/beer.svg"
                  className="beer-icon"
                  alt="beer icon"
                  width={20}
                  height={20}
                />
                <div className="localisation-container">
                  <h3 className="bar-name">{bar.bar.name}</h3>
                  <p>{bar.bar.address}</p>
                </div>
                <div>10 mins</div>
              </div>
            ))}
          </div>
        ) : (
          isLoading
        )}
        <button
          onClick={setupBarathonFunction}
          className="bg-orange text-white start-barathon"
        >
          Démarrer un barathon
        </button>
      </div>
    )
  }

  return <div className="container-bottom bg-white">{content}</div>
}

export default Bottom
