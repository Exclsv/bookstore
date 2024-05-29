'use client'

import { Button } from '@/components/ui/button'
import { Book } from '@prisma/client'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function BookCardForCollection({
  book,
  collectionId,
  insideCollection,
}: {
  book: Book
  collectionId: string
  insideCollection: boolean
}) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleAddBook = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post('/api/addBookToCollection', {
        bookId: book.id,
        collectionId: collectionId,
      })
      console.log('Book added:', response.data)
    } catch (error) {
      console.error('Error adding book to collection:', error)
    } finally {
      setIsLoading(false)
    }
    router.refresh()
  }
  const handleDeleteBook = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post('/api/removeBookFromCollection', {
        bookId: book.id,
        collectionId: collectionId,
      })
      console.log('Book removed:', response.data)
    } catch (error) {
      console.error('Error removing book from collection:', error)
    } finally {
      setIsLoading(false)
    }
    router.refresh()
  }

  return (
    <div className='rounded-xl bg-stone-900/60 p-5 font-semibold text-white backdrop-blur-lg'>
      <h3 className='mb-[10px] text-sm'>{book.title}</h3>
      <Image
        src={book.imageSrc}
        width={170}
        height={230}
        className='aspect-[170/230] w-full rounded-xl object-cover'
        alt='book'
        priority
      />
      {!insideCollection ? (
        <Button
          className='mt-5 block w-full rounded-md bg-green-500 text-xs hover:bg-green-600'
          disabled={isLoading}
          onClick={handleAddBook}>
          {isLoading ? 'Загрузка...' : 'Добавить'}
        </Button>
      ) : (
        <Button
          className='mt-5 block w-full rounded-md bg-red-500 text-xs hover:bg-red-600'
          disabled={isLoading}
          onClick={handleDeleteBook}>
          {isLoading ? 'Удаление...' : 'Удалить'}
        </Button>
      )}
    </div>
  )
}
