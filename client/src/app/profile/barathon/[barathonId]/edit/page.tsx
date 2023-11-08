'use client'

import getBarathon from '@/app/api/barathon/getBarathon'
import updateBarathon from '@/app/api/barathon/updateBarathon'
import getBarathonBars from '@/app/api/bars/getBars'
import { toastAtom, userAtom } from '@/state'
import { GetBarathonInput } from '@/types/barathon/input'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

const EditBarathon = ({ params }: { params: { barathonId: string } }) => {
  const { token } = useAtomValue(userAtom)
  const setToast = useSetAtom(toastAtom)

  const { data: barathon } = useQuery({
    queryKey: ['barathon'],
    queryFn: () => getBarathon({ id: params.barathonId, token: token }),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GetBarathonInput>({
    defaultValues: {
      name: barathon?.name,
      time: barathon?.time,
      radius: barathon?.radius,
      city: barathon?.city,
    },
  })

  const { data: bars } = useQuery({
    queryKey: ['bars'],
    queryFn: () => getBarathonBars({ id: params.barathonId }),
  })

  const onSubmit: SubmitHandler<GetBarathonInput> = (
    data: GetBarathonInput,
  ) => {
    updateBarathon(data, token, params.barathonId)
      .then(() => {
        setToast({
          msg: `Barathon ${barathon?.name} successfuly modified`,
          status: 'Success',
          isVisible: true,
        })
        router.push('/profile/barathon')
      })
      .catch((error) => {
        setToast({
          msg: error.response.data.message,
          status: 'Error',
          isVisible: true,
        })
      })
  }
  const router = useRouter()
  return (
    <div className="bg-[#FFFDF9] h-screen">
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
          Edition du Barathon {barathon?.id}
        </div>
      </div>
      <h1 className="font-medium text-md text-center mt-10 mb-5">
        Informations générales
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-2">
            <label className="mx-3">Nom du barathon</label>
            <input
              placeholder={barathon?.name}
              className="border-2 placeholder:text-black bg-[#FFFDF9] rounded-lg h-10 mx-3 mt-5 focus:border-[#DF9928]"
              {...register('name')}
            />
            {errors?.name && (
              <span className="m-3 text-red-400">{errors.name.message}</span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="mx-3">Heure du barathon</label>
            <input
              type="text"
              placeholder={barathon?.time}
              className="border-2 placeholder:text-black bg-[#FFFDF9] rounded-lg h-10 mx-3 mt-5 focus:border-[#DF9928]"
              {...register('time')}
            />
            {errors?.time && (
              <span className="m-3 text-red-400">{errors.time.message}</span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="mx-3">Rayon du barathon</label>
            <input
              placeholder={`${barathon?.radius} km`}
              className="border-2 placeholder:text-black bg-[#FFFDF9] rounded-lg h-10 mx-3 mt-5 focus:border-[#DF9928]"
              {...register('radius')}
            />
            {errors?.radius && (
              <span className="m-3 text-red-400">{errors.radius.message}</span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="mx-3">Ville du barathon</label>
            <input
              type="text"
              placeholder={barathon?.city}
              className="border-2 placeholder:text-black bg-[#FFFDF9] rounded-lg h-10 mx-3 mt-5 focus:border-[#DF9928]"
              {...register('city')}
            />
            {errors?.city && (
              <span className="m-3 text-red-400">{errors.city.message}</span>
            )}
          </div>
        </div>
        <h2 className="font-medium text-md text-center mt-10 mb-5">
          Liste des bars visités
        </h2>
        {bars?.map((bar: any) => {
          return <div key={bar.id} className="bg-gray-100"></div>
        })}
        <div className="mx-3">
          <button
            type="submit"
            className="bg-[#DF9928] w-full text-white rounded-lg h-10 px-3 mt-5"
          >
            {' '}
            Modifier
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditBarathon
