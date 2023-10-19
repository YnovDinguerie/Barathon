'use client'

import changePassword from '@/app/api/auth/changePassword'
import { UpdatePasswordInputs } from '@/types/auth/inputs'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

const ChangePassword = () => {
  const params = useSearchParams()
  const token = params.get('token') as string
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordInputs>()

  const { isError, mutateAsync: updateFn } = useMutation({
    mutationFn: changePassword,
  })

  const onSubmit: SubmitHandler<UpdatePasswordInputs> = (
    data: UpdatePasswordInputs,
  ) => {
    updateFn({
      token: token,
      email: data.email,
      password: data.password,
      c_password: data.c_password,
    })
  }

  if (isError) {
    return <div>An error occured</div>
  }

  return (
    <div className="flex flex-col space-y-10 bg-[#FFFDF9]">
      <div className="flex flex-col items-center">
        <h1 className="font-medium tracking-wider flex justify-center text-2xl mt-14 font-sans text-[#DF9928]">
          Recreate your password
        </h1>
        <h2 className="text-md font-light text-[#DF9928]">
          Please enter infos create a new password
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-8"
      >
        <div className="relative m-3">
          <input
            {...register('email', { required: true })}
            type="text"
            placeholder="Email"
            className=" bg-[#FFFDF9] w-full py-2 pl-10 pr-4 leading-5 transition-colors duration-150 ease-in-out border-b-2 focus:outline-none"
          />
          <Image
            src="/assets/mail.svg"
            alt="register user icon"
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
            alt="register email icon"
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
            src="/assets/mail.svg"
            alt="register user icon"
            width={20}
            height={20}
            className="absolute top-2 left-3"
          />
          {errors?.email && (
            <span className="m-3 text-red-400">{errors.email.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#DF9928] flex justify-center m-2 p-3 text-white font-medium rounded-lg  hover:bg-gray-400"
        >
          Update password
        </button>
      </form>
    </div>
  )
}

export default ChangePassword
