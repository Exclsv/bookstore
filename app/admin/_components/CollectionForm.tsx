'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Collection } from '@prisma/client'
import { useFormState, useFormStatus } from 'react-dom'
import { updateBook } from '../_actions/products'
import { addCollection, updateCollection } from '../_actions/collections'

export default function CollectionForm({
  collection,
}: {
  collection?: Collection | null
}) {
  const [error, action] = useFormState(
    collection == null ? addCollection : updateCollection.bind(null, collection.id),
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
          defaultValue={collection?.title || ''}
          className='h-[50px] rounded-xl border-transparent bg-stone-900/60 text-white backdrop-blur-lg'
        />
        {error?.title && <div className='text-red-500'>{error.title}</div>}
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
          defaultValue={collection?.author || ''}
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
          defaultValue={collection?.rating || ''}
          className='h-[50px] rounded-xl border-transparent bg-stone-900/60 text-white backdrop-blur-lg'
        />
        {error?.rating && <div className='text-red-500'>{error.rating}</div>}
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
          defaultValue={collection?.price || ''}
          className='h-[50px] rounded-xl border-transparent bg-stone-900/60 text-white backdrop-blur-lg'
        />
        {error?.price && <div className='text-red-500'>{error.price}</div>}
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
