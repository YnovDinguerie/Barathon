import React, { useState } from 'react'

const CitySelector: React.FC<{ onSelectCity: (city: string) => void }> = ({
  onSelectCity,
}) => {
  const [city, setCity] = useState('')

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
  }

  const handleSelectCity = () => {
    if (city) {
      onSelectCity(city)
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Entrez le nom de la ville"
        value={city}
        onChange={handleCityChange}
        className="text-gray-900 bg-gray-100"
      />
      <button onClick={handleSelectCity}>Sélectionner la ville</button>
    </div>
  )
}

export default CitySelector
