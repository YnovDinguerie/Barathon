import React, { useState } from 'react'
import './Bottom.scss'
import './Filter.scss'
import RangeInput from './Input/RangeInput'

const Bottom = () => {
  const [setupBarathon, setSetupBarathon] = useState(false)
  const [barsToVisit, setBarsToVisit] = useState(5)
  const [radiusBars, setRadiusBars] = useState(3)

  const startBarathon = () => {
    setSetupBarathon(true)
  }

  const backToMenu = () => {
    setSetupBarathon(false)
  }

  const handleRangeBarNumberChange = (barsToVisit: number) => {
    setBarsToVisit(barsToVisit)
  }

  const handleRangeRadiusChange = (barsRadius: number) => {
    setRadiusBars(barsRadius)
  }

  const startSearchBarathon = () => {
    console.log(barsToVisit)
    console.log(radiusBars)
  }

  return (
    <div className="container-bottom bg-white">
      {setupBarathon ? (
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
            onClick={startSearchBarathon}
            className="bg-orange text-white start-barathon"
          >
            Démarrer la recherche
          </button>

          <div className="container-back-menu">
            <img
              className="back-menu"
              src="assets/arrow-left.svg"
              alt="back to menu"
            />
            <p onClick={backToMenu} className="text-back-menu">
              Revenir en arrière
            </p>
          </div>
        </div>
      ) : (
        <div>
          {' '}
          <div className="filter-container">
            <img
              className="search-icon"
              src="assets/search.svg"
              alt="search icon"
            />
            <input type="text" placeholder="Où va t-on ?" />
            <img
              className="microphone-icon"
              src="assets/microphone.svg"
              alt="Microphone"
            />
          </div>
          <h2 className="section"> Favories </h2>
          <div className="section-container">
            <img className="beer-icon" src="assets/beer.svg" alt="beer icon" />
            <div className="localisation-container">
              <h3 className="bar-name"> La Cervoiserie </h3>
              <p> 17 Pl. du Palais, 33000 Bordeaux </p>
            </div>
            <div>10 mins</div>
          </div>
          <h2 className="section"> Récents </h2>
          <div className="section-container">
            <img className="beer-icon" src="assets/beer.svg" alt="beer icon" />
            <div className="localisation-container">
              <h3 className="bar-name"> La Cervoiserie </h3>
              <p> 17 Pl. du Palais, 33000 Bordeaux </p>
            </div>
            <div>10 mins</div>
          </div>
          <button
            onClick={startBarathon}
            className="bg-orange text-white start-barathon"
          >
            Démarrer un barathon
          </button>
        </div>
      )}
    </div>
  )
}

export default Bottom
