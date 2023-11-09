import React, { useEffect, useState } from 'react'
import '../../styles/Bottom.scss'
import RangeInput from '../Input/RangeInput'
import { useAtom } from 'jotai'
import { barsToVisitAtom, radiusAtom } from '../../state/map/atoms'
import Image from 'next/image'
import '../../styles/Filter.scss'

const Bottom = () => {
  const [setupBarathon, setSetupBarathon] = useState(false)
  const [startBarathon, setStartBarathon] = useState(false)
  const [barsToVisit, setBarsToVisit] = useAtom(barsToVisitAtom)
  const [radiusBars, setRadiusBars] = useAtom(radiusAtom)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  const setupBarathonFunction = () => {
    setSetupBarathon(true)
  }

  const startBarathonFunction = () => {
    setSetupBarathon(false)
    setStartBarathon(true)
  }

  const backToMenu = () => {
    setSetupBarathon(false)
  }

  const stopGame = () => {
    setSetupBarathon(false)
    setStartBarathon(false)
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
        <h2 className="section">Paramètres avancés</h2>
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
              {minutes} min {remainingSeconds}
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
              <p className="count-bar-left"> 2 </p>
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
          />
          <input type="text" placeholder="Où va t-on ?" />
          <Image
            src="/assets/microphone.svg"
            className="microphone-icon"
            alt="Microphone"
            width={20}
            height={20}
          />
        </div>
        <h2 className="section"> Favories </h2>
        <div className="section-container">
          <Image
            src="/assets/beer.svg"
            className="beer-icon"
            alt="beer icon"
            width={20}
            height={20}
          />
          <div className="localisation-container">
            <h3 className="bar-name"> La Cervoiserie </h3>
            <p> 17 Pl. du Palais, 33000 Bordeaux </p>
          </div>
          <div>10 mins</div>
        </div>
        <h2 className="section"> Récents </h2>
        <div className="section-container">
          <Image
            src="/assets/beer.svg"
            alt="beer icon"
            className="beer-icon"
            width={20}
            height={20}
          />
          <div className="localisation-container">
            <h3 className="bar-name"> La Cervoiserie </h3>
            <p> 17 Pl. du Palais, 33000 Bordeaux </p>
          </div>
          <div>10 mins</div>
        </div>
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
