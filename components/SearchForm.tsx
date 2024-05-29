'use client'

import { IoSearch } from 'react-icons/io5'
import { Button } from './ui/button'
import { Input } from './ui/input'
import FilterSelect from './FilterSelect'
import { FormEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchForm({ genres }: { genres: string[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [bookName, setBookName] = useState(searchParams.get('bookName') || '')
  const [genre, setGenre] = useState(searchParams.get('genre') || 'all')
  const [date, setDate] = useState(searchParams.get('date') || 'all')
  const [rating, setRating] = useState(searchParams.get('rating') || 'all')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const parsedData = Object.fromEntries(formData)

    const query = new URLSearchParams(parsedData as any).toString()
    router.push(`search/?${query}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex justify-between gap-5'>
        <Input
          className='h-[50px] w-full rounded-[20px] border-transparent bg-stone-900/60 px-[20px] py-[14px] text-sm font-bold text-white placeholder:text-stone-400'
          placeholder='Введите название книги'
          name='bookName'
          value={bookName}
          onChange={e => setBookName(e.target.value)}
        />
        <Button
          className='h-[50px] w-[250px] rounded-[20px] bg-price text-center'
          type='submit'>
          <IoSearch size={24} />
          <p className='ml-5 text-sm'>Найти</p>
        </Button>
      </div>

      <div className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3'>
        <FilterSelect
          searchParam='genre'
          name='genre'
          label='Жанры'
          values={['all', ...genres]}
          defaultValue={genre}
          onChange={setGenre}
        />
        <FilterSelect
          name='date'
          searchParam='date'
          label='Дата выпуска'
          values={[
            'all',
            '2020-2024',
            '2010-2020',
            '2000-2010',
            '1990-2000',
            '1980-1990',
            '1970-1980',
            '1960-1970',
          ]}
          defaultValue={date}
          onChange={setDate}
        />
        <FilterSelect
          name='rating'
          searchParam='rating'
          label='Рейтинг'
          values={['all', '1', '2', '3', '4']}
          defaultValue={rating}
          onChange={setRating}
        />
      </div>
    </form>
  )
}
