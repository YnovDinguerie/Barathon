'use client'

import { useSetAtom } from 'jotai'
import { userAtom } from '@/state'
import axios from 'axios'
import { useEffect } from 'react'
import Loader from '@/components/Loader'

import { redirect } from 'next/navigation'
import '../../../styles/GoogleAuth.scss'

const GoogleAuth = () => {
    const setUser = useSetAtom(userAtom)

    useEffect(() => {
        const handleGoogleCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search)
            const token = urlParams.get('token')

            if (token) {
                try {
                    const res = await axios.get('http://127.0.0.1:8000/api/user', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })

                    const user = { ...res.data, token }
                    setUser(user)
                } catch (error) {
                    console.error('Error during API request:', error)
                    // Gérer les erreurs ici (afficher un message, rediriger vers une page d'erreur, etc.)
                } finally {
                    // window.location = '/home'
                }
            } else {
                console.error('Token not found in the URL.')
                // Gérer le cas où le token est manquant (afficher un message, rediriger vers une page d'erreur, etc.)
            }
        }

        // Appeler handleGoogleCallback lors du chargement du composant
        handleGoogleCallback()
    }, [setUser]) // Assurez-vous que setUser est inclus dans les dépendances si nécessaire

    return (
        <div className="google-auth-container">
            <Loader />
            <p>Redirection en cours</p>
        </div>
    )
}

export default GoogleAuth
