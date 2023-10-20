import React, { useState } from 'react'
import './Bottom.scss'
import './Filter.scss'

const Bottom = () => {
  const [setupBarathon, setSetupBarathon] = useState(false)
  const [barsToVisit, setBarsToVisit] = useState(5) // État pour stocker la valeur du range

  const startBarathon = () => {
    setSetupBarathon(true)
  }

  const handleBarsToVisitChange = (e) => {
    setBarsToVisit(parseInt(e.target.value, 10))
  }

  return (
    <div className="container-bottom bg-white">
      {setupBarathon ? (
        <div>
          <h1>Démarrer le Barathon</h1>
          <h2 className="section">Nombre de bars à visiter</h2>
          <div className="container-slider">
            <input
              type="range"
              min="1"
              max="10"
              value={barsToVisit}
              onChange={handleBarsToVisitChange}
            />
            <p>{barsToVisit} bars à visiter</p>
          </div>
          <h2 className="section">Rayon du Barathon (en km)</h2>
          <h2 className="section">Paramètres avancés</h2>
          <button className="bg-orange text-white start-barathon">
            Démarrer la recherche
          </button>
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
