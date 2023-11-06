'use client'
import { toastAtom } from '@/state'
import { useAtom } from 'jotai'
import '../styles/Toast.scss'
import { useEffect, useState } from 'react'
import Image from 'next/image'
const ToastComponent = () => {
    const [toast, setToast] = useAtom(toastAtom)

    const [imageSrc, setImageSrc] = useState(`/assets/${toast.status}.svg`)

    const [isClosing, setIsClosing] = useState(false)
    useEffect(() => {
        setIsClosing(false)

        setImageSrc(`/assets/${toast.status}.svg`)
    }, [toast])
    console.log(toast)
    if (!toast.isVisible) {
        return null
    }

    const closeToast = () => {
        setIsClosing(true)
        setTimeout(() => {
            setToast({
                msg: '',
                status: '',
                isVisible: false,
            })
        }, 400)
    }

    return (
        <div className={`toast toast-${toast.status} ${isClosing ? 'close' : ''}`}>
            <Image
                className="status-img"
                src={imageSrc}
                alt=""
                width={30}
                height={30}
            />
            <div className="text-container">
                <p className="status">{toast.status}</p>
                <p className="msg">{toast.msg}</p>
            </div>

            <img
                onClick={closeToast}
                className="close"
                src="/assets/close.svg"
                alt=""
            />
        </div>
    )
}

export default ToastComponent
