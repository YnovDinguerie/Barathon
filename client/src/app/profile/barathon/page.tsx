'use client'
import getBarathons from '@/app/api/barathon/getBarathons'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getBarathonsType } from '@/types/barathon/input'
import BarathonCard from '@/components/barathon/BarathonCard'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/state'

const BarathonManagement = () => {
  const router = useRouter()
  const user = useAtomValue(userAtom)
  console.log(user)
  const { data: barathons, error } = useQuery({
    queryKey: ['barathons'],
    queryFn: () => getBarathons({ userToken: user.token }),
  })
  if (error) {
    return <div>There was an error</div>
  }
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
    </div>
  )
}

export default BarathonManagement
