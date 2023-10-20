'use client'

import { ResetPasswordInputs } from '@/types/auth/inputs'
import { SubmitHandler, useForm } from 'react-hook-form'
import resetPassword from '../api/resetPassword'
import { useMutation } from 'react-query'
import Image from 'next/image'

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>()

  const { isError, mutateAsync: resetFn } = useMutation({
    mutationFn: resetPassword,
  })

  const onSubmit: SubmitHandler<ResetPasswordInputs> = (
    data: ResetPasswordInputs,
  ) => {
    resetFn({
      email: data.email,
    })
  }

  if (isError) {
    return <div>An error occured</div>
  }

  return (
    <div className="flex flex-col space-y-10">
      <div className="flex flex-col items-center">
        <h1 className="font-medium tracking-wider flex justify-center text-2xl mt-14 font-sans">
          Reset your password
        </h1>
        <h2 className="text-md font-light">Please enter your email address</h2>
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
            className="w-full py-2 pl-10 pr-4 leading-5 transition-colors duration-150 ease-in-out border-b-2 focus:outline-none"
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
          className="flex justify-center m-2 p-3 text-white font-medium rounded-lg bg-indigo-300 hover:bg-gray-400"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
