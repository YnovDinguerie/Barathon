'use client'

import { userAtom } from '@/state'
import { useSetAtom } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Profile = () => {
  const router = useRouter()
  const setUser = useSetAtom(userAtom)
  const logoutUser = () => {
    setUser({
      birtdate: '',
      email: '',
      name: '',
      token: '',
    })
    router.push('/')
  }
  return (
    <div className="h-screen">
      <div className="bg-[#FFFDF9] h-20 w-full p-5 border-b-2 shadow-sm">
        <div className="flex ml-3">
          <Image
            src="/assets/arrow-left.svg"
            onClick={() => router.push('/home')}
            className="cursor-pointer"
            alt="arrow"
            height={20}
            width={20}
          />
          <div className="text-center font-medium m-2 ml-3 text-xl">Profil</div>
        </div>
      </div>
      <div className="m-3">
        <div
          className="bg-[#FFFDF9] h-20 rounded border mb-2 p-2 flex items-center"
          onClick={() => router.push('/profile/profile-info')}
        >
          <h1 className="font-medium flex-grow">Modification du profil</h1>
          <Image
            src="/assets/chevron-right.svg"
            alt="arrow"
            width={20}
            height={20}
            className="flex"
          />
        </div>
        <div
          className="bg-[#FFFDF9] h-20 rounded border mb-2 p-2 flex items-center"
          onClick={() => router.push('/profile/barathon')}
        >
          <h1 className="font-medium flex-grow">Gestion des Barathons</h1>
          <Image
            src="/assets/chevron-right.svg"
            alt="arrow"
            width={20}
            height={20}
            className="flex"
          />
        </div>
        <div
          className="bg-[#FFFDF9] h-20 rounded border mb-2 p-2 flex items-center"
          onClick={() => router.push('/profile/stats')}
        >
          <h1 className="font-medium flex-grow">Statistiques</h1>
          <Image
            src="/assets/chevron-right.svg"
            alt="arrow"
            width={20}
            height={20}
            className="flex"
          />
        </div>
        <div className="flex flex-col justify-end items-center">
          <button
            onClick={logoutUser}
            className="bg-[#DF9928] w-full text-white rounded-lg h-10 px-3 mt-5"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
