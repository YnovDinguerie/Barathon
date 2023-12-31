'use client'
import getBarathons from '@/app/api/barathon/getBarathons'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getBarathonsType } from '@/types/barathon/input'
import BarathonCard from '@/components/barathon/BarathonCard'
import { useAtomValue, useSetAtom } from 'jotai'
import { toastAtom, userAtom } from '@/state'

const BarathonManagement = () => {
  const router = useRouter()
  const user = useAtomValue(userAtom)
  const setToast = useSetAtom(toastAtom)
  const { data: barathons } = useQuery({
    queryKey: ['barathons'],
    queryFn: () =>
      getBarathons({ userToken: user.token }).catch((error) => {
        setToast({
          msg: error.response.data.message,
          status: 'Error',
          isVisible: true,
        })
      }),
  })
  return (
    <div>
      <div className="flex ml-3">
        <Image
          src="/assets/arrow-left.svg"
          onClick={() => router.push('/profile')}
          className="cursor-pointer"
          alt="arrow"
          height={20}
          width={20}
        />
        <div className="text-center font-medium m-2 ml-3 text-xl">
          Gestion des Barathons
        </div>
      </div>
      <div className="bg-gray-100 border text-center">Aujourd&apos;hui</div>
      {barathons?.map((barathon: getBarathonsType) => {
        return (
          <BarathonCard
            key={barathon.id}
            city={barathon.city}
            id={barathon.id}
            name={barathon.name}
            created_at={barathon.created_at}
          />
        )
      })}
      <div className="bg-gray-100 border text-center">il y a 2 jours</div>
      <div className="mx-3">
        <button
          onClick={() => router.push('/barathon/create')}
          className="bg-[#DF9928] w-full text-white rounded-lg h-10 px-3 mt-5"
        >
          Créer un Barathon
        </button>
      </div>
    </div>
  )
}

export default BarathonManagement
