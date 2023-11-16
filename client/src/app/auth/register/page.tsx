'use client'

import Link from 'next/link'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RegisterInputs } from '@/types/auth/inputs'
import registerUser from '../../api/auth/register'
import { useSetAtom } from 'jotai'
import { toastAtom, userAtom } from '@/state'
import { useRouter } from 'next/navigation'
import logger from '@/utils/logger'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>()

  const setUser = useSetAtom(userAtom)
  const router = useRouter()
  const setToast = useSetAtom(toastAtom)

  const onSubmit: SubmitHandler<RegisterInputs> = (data: RegisterInputs) => {
    registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      c_password: data.c_password,
      birthdate: data.birthdate,
    })
      .then((response) => {
        setUser({
          email: response.email,
          name: response.name,
          token: response.token,
          birtdate: response.birthdate,
        })
        logger.error('user register success', response)
        router.push('/home')
      })
      .catch((error) => {
        setToast({
          msg: error.response.data.message,
          status: 'Error',
          isVisible: true,
        })
      })
  }

  return (
    <div className="bg-[#FFFDF9] h-screen flex flex-col space-y-10">
      <div className="flex flex-col items-center">
        <h1 className="text-[#DF9928] font-medium tracking-wider flex justify-center text-2xl mt-14 font-sans">
          Create you account
        </h1>
        <h2 className="text-md font-light text-[#DF9928]">
          Please enter infos to create account
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <div className="relative mx-3">
          <input
            {...register('name', { required: true })}
            type="text"
            placeholder="Name"
            className="bg-[#FFFDF9] w-full py-2 pl-10 pr-4 leading-5 transition-colors duration-150 ease-in-out border-b-2 focus:outline-none"
          />
          <Image
            src="/assets/user.svg"
            alt="register user icon"
            width={20}
            height={20}
            className="absolute top-2 left-3"
          />
          {errors?.name && (
            <span className="m-3 text-red-400">{errors.name.message}</span>
          )}
        </div>
        <div className="relative m-3">
          <input
            {...register('email', { required: true })}
            type="email"
            placeholder="Email"
            className=" bg-[#FFFDF9] w-full py-2 pl-10 pr-4 leading-5 transition-colors duration-150 ease-in-out border-b-2 focus:outline-none"
          />
          <Image
            src="/assets/mail.svg"
            alt="register email icon"
            width={20}
            height={20}
            className="absolute top-2 left-3"
          />
          {errors?.email && (
            <span className="m-3 text-red-400">{errors.email.message}</span>
          )}
        </div>
        <div className="relative m-3">
          <input
            {...register('password', { required: true })}
            type="password"
            placeholder="Password"
            className="bg-[#FFFDF9] w-full py-2 pl-10 pr-4 leading-5 transition-colors duration-150 ease-in-out border-b-2 focus:outline-none"
          />
          <Image
            src="/assets/password.svg"
            alt="register password icon"
            width={20}
            height={20}
            className="absolute top-2 left-3"
          />
          {errors?.password && (
            <span className="m-3 text-red-400">{errors.password.message}</span>
          )}
        </div>
        <div className="relative m-3">
          <input
            {...register('c_password', { required: true })}
            type="password"
            placeholder="Confirm password"
            className="bg-[#FFFDF9] w-full py-2 pl-10 pr-4 leading-5 transition-colors duration-150 ease-in-out border-b-2 focus:outline-none"
          />
          <Image
            src="/assets/password.svg"
            alt="register confirm password icon"
            width={20}
            height={20}
            className="absolute top-2 left-3"
          />
          {errors.c_password && (
            <span className="m-3 text-red-400">
              {errors?.c_password.message}
            </span>
          )}
        </div>
        <div className="relative m-3">
          <input
            {...register('birthdate', { required: true })}
            type="date"
            placeholder="Confirm password"
            className="bg-[#FFFDF9] text-gray-400 text- w-full py-2 pl-10 pr-4 leading-5 transition-colors duration-150 ease-in-out border-b-2 focus:outline-none"
          />
          <Image
            src="/assets/birthday.svg"
            alt="register confirm password icon"
            width={20}
            height={20}
            className="absolute top-2 left-3"
          />
          {errors?.birthdate && (
            <span className="m-3 text-red-400">This field is required</span>
          )}
        </div>
        {/* <div className="text-[#DF9928] flex justify-end mr-3 font-light text-sm">
          <Link href="/auth/reset">Forgot password ?</Link>
        </div> */}
        <button
          type="submit"
          className="bg-[#E9AB47] flex justify-center mx-3 p-3 text-white font-medium rounded-xl hover:bg-gray-400"
        >
          Register
        </button>
        <div className="flex justify-center">
          <div className="text-sm text-[#DF9928] mr-3">
            Already have an account ?{' '}
            <Link href="/auth/login" className="underline">
              Login
            </Link>
          </div>
        </div>
        <div className="text-[#DF9928] flex justify-center text-sm">
          <div>Or register via</div>
        </div>
        <div className="flex flex-col space-y-3 mx-3">
          <button className="rounded-full p-3 w-full text-white bg-red-400 font-medium">
            Connect with Google
          </button>
          <button className="rounded-full bg-blue-400 w-full p-3 text-white font-medium">
            Connect with Facebook
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
