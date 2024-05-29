'use client'

import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Book } from '@prisma/client'
import { useFormState, useFormStatus } from 'react-dom'
import { addBook, updateBook } from '../_actions/products'
import Image from 'next/image'

export default function ProductForm({ book }: { book?: Book | null }) {
  const [error, action] = useFormState(
    book == null ? addBook : updateBook.bind(null, book.id),
    {},
  )
  return (
    <form className='space-y-8' action={action}>
      <div className='space-y-2'>
        <Label htmlFor='title' className='text-white'>
          Название
        </Label>
        <Input
          type='text'
          id='title'
          name='title'
          required
          defaultValue={book?.title || ''}
          className='h-[50px] rounded-xl border-transparent bg-stone-900/60 text-white backdrop-blur-lg'
        />
        {error?.title && <div className='text-red-500'>{error.title}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='slogan' className='text-white'>
          Слоган
        </Label>
        <Input
          type='text'
          id='slogan'
          name='slogan'
          required
          defaultValue={book?.slogan || ''}
          className='h-[50px] rounded-xl border-transparent bg-stone-900/60 text-white backdrop-blur-lg'
        />
        {error?.slogan && <div className='text-red-500'>{error.slogan}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='author' className='text-white'>
          Автор
        </Label>
        <Input
          type='text'
          id='author'
          name='author'
          required
          defaultValue={book?.author || ''}
          className='h-[50px] rounded-xl border-transparent bg-stone-900/60 text-white backdrop-blur-lg'
        />
        {error?.author && <div className='text-red-500'>{error.author}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='rating' className='text-white'>
          Рейтинг
        </Label>
        <Input
          type='number'
          step={0.1}
          max={5}
          min={1}
          id='rating'
          name='rating'
          required
          defaultValue={book?.rating || ''}
          className='h-[50px] rounded-xl border-transparent bg-stone-900/60 text-white backdrop-blur-lg'
        />
        {error?.rating && <div className='text-red-500'>{error.rating}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='published' className='text-white'>
          Дата публикации
        </Label>
        <Input
          type='date'
          id='published'
          name='published'
          required
          defaultValue={
            book?.published
              ? new Date(book.published).toISOString().slice(0, 10)
              : ''
          }
          className='h-[50px] rounded-xl border-transparent bg-stone-900/60 text-white backdrop-blur-lg'
        />
        {error?.published && (
          <div className='text-red-500'>{error.published}</div>
        )}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='pages' className='text-white'>
          Количество страниц
        </Label>
        <Input
          type='number'
          id='pages'
          name='pages'
          required
          defaultValue={book?.pages || ''}
          className='h-[50px] rounded-xl border-transparent bg-stone-900/60 text-white backdrop-blur-lg'
        />
        {error?.pages && <div className='text-red-500'>{error.pages}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='description' className='text-white'>
          Описание
        </Label>
        <Textarea
          id='description'
          name='description'
          required
          defaultValue={book?.description || ''}
          className='h-[50px] rounded-xl border-transparent bg-stone-900/60 text-white backdrop-blur-lg'
        />
        {error?.description && (
          <div className='text-red-500'>{error.description}</div>
        )}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='genre' className='text-white'>
          Жанры
        </Label>
        <Input
          type='text'
          id='genre'
          name='genre'
          required
          defaultValue={book?.genre || ''}
          className='h-[50px] rounded-xl border-transparent bg-stone-900/60 text-white backdrop-blur-lg'
        />
        {error?.genre && <div className='text-red-500'>{error.genre}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='tags' className='text-white'>
          Теги
        </Label>
        <Input
          type='text'
          id='tags'
          name='tags'
          required
          defaultValue={book?.tags || ''}
          className='h-[50px] rounded-xl border-transparent bg-stone-900/60 text-white backdrop-blur-lg'
        />
        {error?.tags && <div className='text-red-500'>{error.tags}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='price' className='text-white'>
          Цена
        </Label>
        <Input
          type='number'
          id='price'
          name='price'
          required
          defaultValue={book?.price || ''}
          className='h-[50px] rounded-xl border-transparent bg-stone-900/60 text-white backdrop-blur-lg'
        />
        {error?.price && <div className='text-red-500'>{error.price}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='file' className='text-white'>
          Файл
        </Label>
        <Input
          type='file'
          id='file'
          name='file'
          required={book == null}
          className='h-[50px] rounded-xl border-transparent bg-stone-900/60 py-3 text-white backdrop-blur-lg file:mr-3 file:rounded-md file:bg-orange-600 file:text-white'
        />
        {error?.file && <div className='text-red-500'>{error.file}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='image' className='text-white'>
          Изображение
        </Label>
        <Input
          type='file'
          id='image'
          name='image'
          required={book == null}
          className='h-[50px] rounded-xl border-transparent bg-stone-900/60 py-3 text-white backdrop-blur-lg file:mr-3 file:rounded-md file:bg-orange-600 file:text-white'
        />
        {book != null && (
          <Image
            src={book.imageSrc}
            alt='book-cover-image'
            className='w-auto rounded-md object-cover'
            width={200}
            height={200}
          />
        )}
        {error?.image && <div className='text-red-500'>{error.image}</div>}
      </div>

      <div className='w-full'>
        <SubmitButton />
      </div>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button className='mx-auto block h-[50px] w-full rounded-[20px] bg-green-500 py-4 text-sm font-bold text-white duration-200 hover:bg-green-600 active:translate-y-[2px] sm:w-[350px]'>
      {pending ? 'Загрузка...' : 'Создать'}
    </Button>
  )
}
