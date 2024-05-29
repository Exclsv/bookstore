'use client'

import { IoSearch } from 'react-icons/io5'
import { Button } from './ui/button'
import { Input } from './ui/input'
import FilterSelect from './FilterSelect'
import { FormEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchFormCollection() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [collectionName, setCollectionName] = useState(
    searchParams.get('collectionName') || '',
  )

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const parsedData = Object.fromEntries(formData)

    const query = new URLSearchParams(parsedData as any).toString()
    router.push(`search-collections/?${query}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex justify-between gap-5'>
        <Input
          className='h-[50px] w-full rounded-[20px] border-transparent bg-stone-900/60 px-[20px] py-[14px] text-sm font-bold text-white placeholder:text-stone-400'
          placeholder='Введите название сборника'
          name='collectionName'
          value={collectionName}
          onChange={e => setCollectionName(e.target.value)}
        />
        <Button
          className='h-[50px] w-[250px] rounded-[20px] bg-price text-center'
          type='submit'>
          <IoSearch size={24} />
          <p className='ml-5 text-sm'>Найти</p>
        </Button>
      </div>
    </form>
  )
}
