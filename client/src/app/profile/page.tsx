'use client'

import Header from '@/components/home/Header'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Profile = () => {
  const router = useRouter()
  return (
    <div>
      <Header />
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
      </div>
    </div>
  )
}

export default Profile
