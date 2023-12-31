'use client'
import React from 'react'
import '../../styles/Header.scss'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/state'

const Header = () => {
  const router = useRouter()
  const { name } = useAtomValue(userAtom)
  return (
    <div>
      <div className="container-header bg-white">
        <div>
          <p> Bonjour </p>
          <p className="text-orange">{name}</p>
        </div>
        <div className="relative" onClick={() => router.push('profile')}>
          <Image
            src="/assets/user.jpg"
            alt="image profile"
            className="user-profile"
            width={50}
            height={50}
          />
          <Image
            src="/assets/trophy.png"
            alt="image profile"
            className="image-profile"
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  )
}

export default Header
