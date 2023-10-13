'use client'

import Link from 'next/link'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Inputs } from '@/types/auth/inputs'

const Inscription = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    console.log(data)
  }

  return (
    <div className="flex flex-col space-y-10">
      <div className="flex flex-col items-center">
        <h1 className="font-medium tracking-wider flex justify-center text-2xl mt-14 font-sans">
          Create you account
        </h1>
        <h2 className="text-md font-light">
          Please enter infos to create account
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-8"
      >
        <div className="relative m-3">
          <input
            {...register('name', { required: true })}
            type="text"
            placeholder="Name"
            className="w-full py-2 pl-10 pr-4 leading-5 transition-colors duration-150 ease-in-out border-b-2 focus:outline-none"
          />
          <Image
            src="/assets/user.svg"
            alt="register user icon"
            width={20}
            height={20}
            className="absolute top-2 left-3"
          />
          {errors.name && (
            <span className="m-3 text-red-400">This field is required</span>
          )}
        </div>
        <div className="relative m-3">
          <input
            {...register('email', { required: true })}
            type="email"
            placeholder="Email"
            className="w-full py-2 pl-10 pr-4 leading-5 transition-colors duration-150 ease-in-out border-b-2 focus:outline-none"
          />
          <Image
            src="/assets/mail.svg"
            alt="register email icon"
            width={20}
            height={20}
            className="absolute top-2 left-3"
          />
          {errors.email && (
            <span className="m-3 text-red-400">This field is required</span>
          )}
        </div>
        <div className="relative m-3">
          <input
            {...register('password', { required: true })}
            type="password"
            placeholder="Password"
            className="w-full py-2 pl-10 pr-4 leading-5 transition-colors duration-150 ease-in-out border-b-2 focus:outline-none"
          />
          <Image
            src="/assets/password.svg"
            alt="register password icon"
            width={20}
            height={20}
            className="absolute top-2 left-3"
          />
          {errors.password && (
            <span className="m-3 text-red-400">This field is required</span>
          )}
        </div>
        <div className="relative m-3">
          <input
            {...register('passwordConfirmation', { required: true })}
            type="password"
            placeholder="Confirm password"
            className="w-full py-2 pl-10 pr-4 leading-5 transition-colors duration-150 ease-in-out border-b-2 focus:outline-none"
          />
          <Image
            src="/assets/password.svg"
            alt="register confirm password icon"
            width={20}
            height={20}
            className="absolute top-2 left-3"
          />
          {errors.passwordConfirmation && (
            <span className="m-3 text-red-400">This field is required</span>
          )}
        </div>
        <div className="relative m-3">
          <input
            {...register('birthday', { required: true })}
            type="date"
            placeholder="Confirm password"
            className="w-full py-2 pl-10 pr-4 leading-5 transition-colors duration-150 ease-in-out border-b-2 focus:outline-none"
          />
          <Image
            src="/assets/birthday.svg"
            alt="register confirm password icon"
            width={20}
            height={20}
            className="absolute top-2 left-3"
          />
          {errors.passwordConfirmation && (
            <span className="m-3 text-red-400">This field is required</span>
          )}
        </div>
        <div className="flex justify-end m-3 font-light text-gray-400 text-sm">
          <Link href="#">Forgot password ?</Link>
        </div>
        <button
          type="submit"
          className="flex justify-center m-2 p-3 text-white font-medium rounded-lg bg-indigo-300 hover:bg-gray-400"
        >
          Register
        </button>
        <div className="flex justify-center">
          <div>Or login via</div>
        </div>
        <div className="flex justify-between space-x-10 m-2">
          <button className="rounded-full border p-3 w-full text-red-300 font-medium">
            Google
          </button>
          <button className="rounded-full border w-full p-3 text-blue-300 font-medium">
            Facebook
          </button>
        </div>
      </form>
    </div>
  )
}

export default Inscription
