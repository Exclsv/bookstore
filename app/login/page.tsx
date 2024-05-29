'use client'

import { Input } from '@/components/ui/input'
import Image from 'next/image'
import registerLogo from '@/app/assets/register-logo.svg'
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { FormEvent } from 'react'
import { signIn } from 'next-auth/react'

export default function page() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    // console.log(data)

    signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: '/',
    })
  }

  return (
    <main className='flex min-h-screen items-center justify-center  bg-stone-900/60 backdrop-blur-lg'>
      <div className='flex flex-col items-center'>
        <Image src={registerLogo} alt='register-logo' priority />
        <h1 className='mb-10 text-center text-2xl font-bold text-white'>
          ВХОД В АККАУНТ
        </h1>
        <form className='space-y-5' onSubmit={handleSubmit}>
          <div>
            <Input
              className='h-[50px] w-full rounded-[20px] border-transparent bg-stone-900/60 px-5 py-3 text-sm text-white sm:w-[350px]'
              placeholder='Почтовый адрес'
              name='email'
              id='email'
              autoComplete='email'
              required
            />
            {/* {error?.email && <div className='text-red-500'>{error.email}</div>} */}
          </div>
          <div>
            <Input
              className='h-[50px] w-full rounded-[20px] border-transparent bg-stone-900/60 px-5 py-3 text-sm text-white sm:w-[350px]'
              placeholder='Пароль'
              type='password'
              name='password'
              id='password'
            />
            {/* {error?.password && (
              <div className='text-red-500'>{error.password}</div>
            )} */}
          </div>
          <SubmitButton />
          {/* <button className='h-[50px] w-full rounded-[20px] bg-green-500 py-4 text-sm font-bold text-white'>
            Войти в аккаунт
          </button> */}
        </form>
      </div>
    </main>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      className='h-[50px] w-full rounded-[20px] bg-green-500 py-4 text-sm font-bold text-white duration-200 hover:bg-green-600 active:translate-y-[2px] sm:w-[350px]'
      disabled={pending}>
      {pending ? 'Обработка...' : 'Войти в аккаунт'}
    </Button>
  )
}
