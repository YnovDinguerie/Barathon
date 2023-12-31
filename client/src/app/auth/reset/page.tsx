'use client'

import { ResetPasswordInputs } from '@/types/auth/inputs'
import { SubmitHandler, useForm } from 'react-hook-form'
import resetPassword from '../../api/auth/resetPassword'
import { useMutation } from 'react-query'
import Image from 'next/image'
import { useSetAtom } from 'jotai'
import { toastAtom } from '@/state'

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>()

  const setToast = useSetAtom(toastAtom)

  const onSubmit: SubmitHandler<ResetPasswordInputs> = (
    data: ResetPasswordInputs,
  ) => {
    resetPassword({
      email: data.email,
    }).catch((error) => {
      setToast({
        msg: error.response.data.message,
        status: 'Error',
        isVisible: true,
      })
    })
  }

  return (
    <div className="flex flex-col space-y-10 bg-[#FFFDF9]">
      <div className="flex flex-col items-center">
        <h1 className="text-[#DF9928] font-medium tracking-wider flex justify-center text-2xl mt-14 font-sans">
          Reset your password
        </h1>
        <h2 className="text-[#DF9928] text-md font-light">
          Please enter your email address
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
          className="bg-[#DF9928] flex justify-center m-2 p-3 text-white font-medium rounded-xl hover:bg-gray-400"
        >
          Reset
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
