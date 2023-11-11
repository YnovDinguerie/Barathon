'use client'

import { useSetAtom } from 'jotai'
import { toastAtom, userAtom } from '@/state'
import axios from 'axios'
import { useEffect } from 'react'
import Loader from '@/components/Loader'

import '../../../styles/GoogleAuth.scss'
import { useRouter } from 'next/navigation'

const GoogleAuth = () => {
    const setUser = useSetAtom(userAtom)
    const setToast = useSetAtom(toastAtom)
    const router = useRouter()

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
                    router.push('/home')
                } catch (err) {
                    setToast({
                        msg: err.response.data.message,
                        status: 'Error',
                        isVisible: true,
                    })
                    return router.push('/')
                }
            } else {
                setToast({
                    msg: 'Token manquant',
                    status: 'Error',
                    isVisible: true,
                })
                return router.push('/')
            }
        }

        handleGoogleCallback()
    }, [setUser])

    return (
        <div className="google-auth-container">
            <Loader />
            <p>Redirection en cours</p>
        </div>
    )
}

export default GoogleAuth
