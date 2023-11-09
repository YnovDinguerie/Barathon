'use client'

import deleteBarathon from '@/app/api/barathon/deleteBarathon'
import getBarathon from '@/app/api/barathon/getBarathon'
import getBarathonBars from '@/app/api/bars/getBrathonBars'
import getBars from '@/app/api/bars/getBars'
import { toastAtom, userAtom } from '@/state'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useAtomValue, useSetAtom } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { latitudeAtom, longitudeAtom, radiusAtom } from '@/state/map/atoms'

const BarathonIdPage = ({ params }: { params: { barathonId: string } }) => {
  const user = useAtomValue(userAtom)
  const longitude = useAtomValue(longitudeAtom)
  const latitude = useAtomValue(latitudeAtom)
  const radius = useAtomValue(radiusAtom)
  const setToast = useSetAtom(toastAtom)
  const { data: barathon } = useQuery({
    queryKey: ['barathon'],
    queryFn: () => getBarathon({ id: params.barathonId, token: user.token }),
  })

  const deleteABarathon = () => {
    deleteBarathon({
      id: params.barathonId,
      token: user.token,
    })
      .then(() => {
        setToast({
          isVisible: true,
          msg: `Barathon ${params.barathonId} successfuly deleted`,
          status: 'Success',
        })
        router.push('/profile/barathon')
      })
      .catch((error) => {
        setToast({
          msg: error.response.data.message,
          isVisible: true,
          status: 'Error',
        })
      })
  }

  const { data: barathonBars } = useQuery({
    queryKey: ['barathonBars'],
    queryFn: () =>
      getBarathonBars({ id: params.barathonId, token: user.token }),
  })

  const { data: bars } = useQuery({
    queryKey: ['bars'],
    queryFn: () =>
      getBars({
        latitude: -0.5729089,
        longitude: 44.8627513,
        radius: 10,
        token: user.token,
      }),
  })

  const router = useRouter()
  return (
    <div className="bg-[#FFFDF9]">
      <div className="flex items-center">
        <Image
          src="/assets/arrow-left.svg"
          onClick={() => router.push('/profile/barathon')}
          className="cursor-pointer"
          alt="arrow"
          height={20}
          width={20}
        />
        <div className="text-center font-medium m-2 ml-3 text-xl">
          {barathon?.name}
        </div>
      </div>
      <div className="bg-gray-100 rounded-lg p-2 mx-2 my-5">
        <div>
          Date de création :{' '}
          {format(new Date(barathon?.created_at ?? 0), 'dd/MM/yyy')}
        </div>
        <div>Ville : {barathon?.city}</div>
        <div>Heure : {barathon?.time}</div>
        <div>Rayon séléctioné {barathon?.radius}</div>
      </div>

      <div className="font-medium">Bars visités</div>

      {bars?.map((bar: any) => {
        return (
          <div key={bar.id} className="bg-gray-100">
            {bar.name}
          </div>
        )
      })}
      <button
        onClick={() => router.push(`${params.barathonId}/edit`)}
        className="bg-[#DF9928] w-full text-white rounded-lg h-10 px-3 mt-5"
      >
        Editer le barathon
      </button>
      <button
        onClick={deleteABarathon}
        className="bg-[#DF9928] w-full text-white rounded-lg h-10 px-3 mt-5"
      >
        Supprimer le barathon
      </button>
    </div>
  )
}

export default BarathonIdPage
