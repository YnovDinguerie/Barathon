'use client'

import modifyUser from '@/app/api/auth/modifyUser'
import { toastAtom, userAtom } from '@/state'
import { ProfileInfo } from '@/types/auth/inputs'
import { useAtomValue, useSetAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

const ProfileInfos = () => {
  const router = useRouter()

  const { name, email, birtdate, token } = useAtomValue(userAtom)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInfo>({
    defaultValues: {
      name: name,
      email: email,
      birthdate: birtdate,
    },
  })

  const setToast = useSetAtom(toastAtom)
  const setUser = useSetAtom(userAtom)

  const onSubmit: SubmitHandler<ProfileInfo> = (data: ProfileInfo) => {
    modifyUser({
      name: data.name,
      email: data.email,
      birthdate: data.birthdate,
      token: token,
    })
      .then((response) => {
        console.log(response)
        setUser({
          email: response.email,
          name: response.name,
          birtdate: response.birthdate,
          token: token,
        })
        setToast({
          isVisible: true,
          msg: `User ${response.name} has been successfuly modified`,
          status: 'Success',
        })
        router.push('/home')
      })
      .catch((error) => {
        setToast({
          msg: error.response.data.message,
          isVisible: true,
          status: 'Error',
        })
      })
  }

  return (
    <div className="bg-[#FFFDF9] flex flex-col space-y-7">
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
          Account informations
        </div>
      </div>
      <div className="text-sm italic ml-3">
        Here you can modify your account infos by changing your username and/or
        password
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
      >
        <div className="flex flex-col space-y-2">
          <label className="ml-3">Name</label>
          <input
            {...register('name')}
            placeholder={name}
            className="border-2 placeholder:text-black bg-[#FFFDF9] rounded-lg h-10 mx-3 mt-5 focus:border-[#DF9928]"
          />
          {/* {errors?.name && (
            <span className="ml-3 text-red-800 ">{errors.name.message}</span>
          )} */}
        </div>
        <div className="flex flex-col space-y-2">
          <label className="ml-3">Email</label>
          <input
            {...register('email')}
            type="text"
            placeholder={email}
            className="border-2 bg-[#FFFDF9] placeholder:text-black rounded-lg h-10 ml-3 mt-5 focus:border-[#DF9928] mx-3"
          />
          {/* {errors?.email && (
            <span className="m-3 text-red-800">{errors.email.message}</span>
          )} */}
        </div>
        <div className="flex flex-col space-y-2">
          <label className="ml-3">Birthdate</label>
          <input
            {...register('birthdate')}
            type="text"
            placeholder={birtdate}
            className="border-2 bg-[#FFFDF9] placeholder:text-black rounded-lg h-10 ml-3 mt-5 focus:border-[#DF9928] mx-3"
          />
          {/* {errors?.birthdate && (
            <span className="m-3 text-red-800">{errors.birthdate.message}</span>
          )} */}
        </div>
        <div className="mx-3">
          <button
            type="submit"
            className="bg-[#DF9928] w-full rounded-lg h-10 p-2 font-sans"
          >
            Modifier
          </button>
        </div>
      </form>
      <Link
        href="/auth/reset-password"
        className="underline cursor-pointer ml-3"
      >
        Modifier le mot de passe{' '}
      </Link>
    </div>
  )
}

export default ProfileInfos
