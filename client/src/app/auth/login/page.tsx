'use client'

import { LoginInputs } from '@/types/auth/inputs'
import { SubmitHandler, useForm } from 'react-hook-form'
import loginUser from '../../api/auth/login'
import Image from 'next/image'
import Link from 'next/link'
import { useSetAtom } from 'jotai'
import axios from 'axios'
import { toastAtom, userAtom } from '@/state'
import { useRouter } from 'next/navigation'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>()

  const router = useRouter()

  const setUser = useSetAtom(userAtom)
  const setToast = useSetAtom(toastAtom)

  const onSubmit: SubmitHandler<LoginInputs> = (data: LoginInputs) => {
    loginFn({
      email: data.email,
      password: data.password,
    }).then((response) => {
      setUser(response)
    })
  }

  const googleAuth = async () => {
    const res = await axios
      .get('http://127.0.0.1:8000/api/authorized/google', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const redirectUrl = res.data.redirect_url
        console.log(res.data.redirect_url)
        window.location = redirectUrl
      })
  }

  if (isError) {
    return (
      <>
        <div className="flex flex-col items-center">
          <h1 className="font-medium tracking-wider flex justify-center text-2xl mt-14 font-sans text-[#DF9928]">
            Log in into you account
          </h1>
          <h2 className="text-md font-light text-[#DF9928]">
            Please enter infos to log in
          </h2>
        </div>
        <div>An errror occured</div>
      </>
    )
    loginUser({ email: data.email, password: data.password })
      .then((response) => {
        setUser({
          email: response.email,
          name: response.name,
          token: response.token,
          birtdate: response.birthdate,
        })
        router.push('/home')
      })
      .catch((err) => {
        setToast({
          msg: err.response.data.message,
          status: 'Error',
          isVisible: true,
        })
      })
  }

  return (
    <div className="flex h-screen flex-col space-y-10 bg-[#FFFDF9]">
      <div className="flex flex-col items-center">
        <h1 className="font-medium tracking-wider flex justify-center text-2xl mt-14 font-sans text-[#DF9928]">
          Log in into you account
        </h1>
        <h2 className="text-md font-light text-[#DF9928]">
          Please enter infos to log in
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
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
        <div className="flex justify-end mr-3 font-light text-[#DF9928] text-sm">
          <Link href="/auth/reset-password">Forgot password ?</Link>
        </div>
        <button
          type="submit"
          className="flex justify-center m-2 p-3 text-white font-medium rounded-xl bg-[#E9AB47] hover:bg-gray-400"
        >
          Login
        </button>
        <div className="flex justify-center">
          <div className="text-sm mr-3  text-[#DF9928]">
            You don&apos;t have an account ? {''}
            <Link href="/auth/register" className="underline">
              Register
            </Link>
          </div>
        </div>
        <div className="flex justify-center text-[#DF9928]">
          <div>Or login via</div>
        </div>
        <div className="flex flex-col space-y-3 mx-3">
          <button
            onClick={googleAuth}
            className="rounded-full p-3 w-full text-white bg-red-400 font-medium"
          >
            Connect with Google
          </button>
          <button className="rounded-full bg-blue-400 w-full p-3 text-white font-medium">
            Connect with Facebook Provider
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
