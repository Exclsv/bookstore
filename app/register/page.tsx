'use client'

import { Input } from '@/components/ui/input'
import Image from 'next/image'
import registerLogo from '@/app/assets/register-logo.svg'
import { useFormState, useFormStatus } from 'react-dom'
import { createAccount } from '../_actions/actions'
import { Button } from '@/components/ui/button'

export default function page() {
  const [error, action] = useFormState(createAccount, {})

  return (
    <main className='flex min-h-screen items-center justify-center  bg-stone-900/60 backdrop-blur-lg'>
      <div className='flex flex-col items-center'>
        <Image src={registerLogo} alt='register-logo' priority />
        <h1 className='mb-10 text-center text-2xl font-bold text-white'>
          СОЗДАНИЕ АККАУНТА
        </h1>
        <form className='space-y-5' action={action}>
          <div>
            <Input
              className='h-[50px] w-full rounded-[20px] border-transparent bg-stone-900/60 px-5 py-3 text-sm text-white sm:w-[350px]'
              placeholder='Почтовый адрес'
              name='email'
            />
            {error?.email && <div className='text-red-500'>{error.email}</div>}
          </div>
          <div>
            <Input
              className='h-[50px] w-full rounded-[20px] border-transparent bg-stone-900/60 px-5 py-3 text-sm text-white sm:w-[350px]'
              placeholder='Пароль'
              type='password'
              name='password'
            />
            {error?.password && (
              <div className='text-red-500'>{error.password}</div>
            )}
          </div>
          <SubmitButton />
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
      {pending ? 'Загрузка...' : 'Зарегистрироваться'}
    </Button>
  )
}
