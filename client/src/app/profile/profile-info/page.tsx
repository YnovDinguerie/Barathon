'use client'

import { userAtom } from '@/state'
import { ProfileInfo } from '@/types/auth/inputs'
import { useAtomValue } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

const ProfileInfos = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInfo>()

  const { name } = useAtomValue(userAtom)

  const onSubmit: SubmitHandler<ProfileInfo> = (data: ProfileInfo) => {
    console.log(data)
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
            {...register('name', {
              required: {
                message: 'Input field must not be empty',
                value: true,
              },
            })}
            // placeholder={name}
            value={name}
            className="border-2 bg-[#FFFDF9] rounded-lg h-10 mx-3 mt-5 focus:border-[#DF9928]"
          />
          {errors?.name && (
            <span className="ml-3 text-red-800 ">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label className="ml-3">Email</label>
          <input
            {...register('email', {
              required: {
                message: 'Email must not be empty',
                value: true,
              },
            })}
            type="text"
            placeholder="email"
            className="border-2 bg-[#FFFDF9] rounded-lg h-10 ml-3 mt-5 focus:border-[#DF9928] mx-3"
          />
          {errors?.email && (
            <span className="m-3 text-red-800">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label className="ml-3">Birthdate</label>
          <input
            {...register('birthdate', {
              required: {
                message: 'Birthdate must not be empty',
                value: true,
              },
            })}
            type="date"
            placeholder="Birthday date"
            className="border-2 bg-[#FFFDF9] rounded-lg h-10 ml-3 mt-5 focus:border-[#DF9928] mx-3"
          />
          {errors?.birthdate && (
            <span className="m-3 text-red-800">{errors.birthdate.message}</span>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="bg-[#DF9928] rounded-lg h-10 p-2 font-sans mx-3"
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
