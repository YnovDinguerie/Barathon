/* eslint-disable prettier/prettier */
import { apiFetch, reverseGeocode } from '@/app/api/utils'
import { resizeMapAtom } from '@/state/map/atoms'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const FavoriteBars = () => {
	const [allFavoriteBars, setAllFavoriteBars] = useState([])
	const [resizeMap, setResizeMap] = useAtom(resizeMapAtom)

	const [isLoaded, setIsLoaded] = useState(false)
	const getfavoriteBar = async () => {
		setIsLoaded(false)
		const res = await apiFetch('GET', '/favorite-bars/')

		const bars = res.data.data

		const barsWithAddresses = await Promise.all(
			bars.map(async (bar) => {
				bar.bar.address = await reverseGeocode(
					bar.bar.longitude,
					bar.bar.latitude,
				)
				return bar
			}),
		)

		setAllFavoriteBars(barsWithAddresses)
		setResizeMap(!resizeMap)
		setIsLoaded(true)
	}

	const deleteFavoriteBar = async (barID: string) => {
		console.log(barID)
		await apiFetch('DELETE', `/favorite-bars/${barID}`).then((response) => {
			console.log(response)
			setAllFavoriteBars(allFavoriteBars.filter((x) => x.id !== barID))
		})
		setResizeMap(!resizeMap)
	}

	const startDestination = (bar) => {
		const userConfirmed = window.confirm(
			'Lancer la navigation sur Google Maps ?',
		)

		if (userConfirmed) {
			const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${bar.bar.latitude},${bar.bar.longitude}`
			window.location.href = googleMapsUrl
		} else {
			alert('Navigation annulée.')
		}
	}

	useEffect(() => {
		getfavoriteBar()
	}, [])

	return (
		<div className="favorite-bars-container">
			{allFavoriteBars.length > 0 ? (
				<h2 className="section"> Favories </h2>
			) : (
				<p className="start-add-favorite">
					Commencer par ajouter des favories à l aide de la barre de recherche
				</p>
			)}
			{isLoaded ? (
				<div className="favorites-bar-container">
					{allFavoriteBars.map((bar, index) => (
						<div
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
							<div onClick={() => startDestination(bar)} className="localisation-container">
								<h3 className="bar-name">{bar.bar.name}</h3>
								<p>{bar.bar.address}</p>
							</div>
							<button>
								<Image
									src="/assets/close.svg"
									onClick={() => deleteFavoriteBar(bar.id)}
									className="close"
									alt=""
									width={30}
									height={30}
								/>
							</button>
						</div>
					))}
				</div>
			) : (
				isLoaded
			)}
		</div>
	)
}

export default FavoriteBars
