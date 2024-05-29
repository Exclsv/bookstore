'use server'

import { formatTextSize } from '@/lib/utils'
import Image from 'next/image'
import arrowRightGray from '@/app/assets/arrow-right-gray.svg'
import Rating from './Rating'
import { Collection } from '@prisma/client'
import db from '@/db/db'
import Link from 'next/link'

export default async function BooksCardExpanded({
  collection,
}: {
  collection?: Collection
}) {
  if (collection && collection.numberOfBooks < 1) return null

  const books = await db.book.findMany({
    where: {
      collectionId: collection?.id,
    },
  })

  const imageProps = [
    {
      width: 160,
      height: 230,
      className: 'relative z-30 rounded-[10px] aspect-[160/230] object-cover',
    },
    {
      width: 155,
      height: 223,
      className:
        'absolute left-[12px] top-1 z-20 rounded-[10px] aspect-[160/230] object-cover',
    },
    {
      width: 145,
      height: 210,
      className:
        'absolute left-[28px] top-[12px] z-10 rounded-[10px] aspect-[160/230] object-cover',
    },
  ]

  if (!books.length) return null

  // Limit the number of images to the minimum of the number of books or 3
  const imagesToRender = Math.min(books.length, 3)

  // Only take as many images as we need
  const bookImages = books.slice(0, imagesToRender)

  return (
    <div className='slide flex h-[260px] w-[435px] min-w-[435px] gap-7 rounded-[20px] bg-stone-900/60 p-5'>
      <div className='relative -top-10  min-w-[160px]'>
        {!collection && (
          <>
            <Image
              src='/bookImages/good-to-great-1.png'
              width={160}
              height={230}
              alt='book'
              className='relative z-30 aspect-[160/230] rounded-[10px]'
            />
            <Image
              src='/bookImages/good-to-great-2.png'
              width={155}
              height={223}
              alt='book'
              className='absolute left-[12px] top-1 z-20 rounded-[10px]'
            />
            <Image
              src='/bookImages/good-to-great-3.png'
              width={145}
              height={210}
              alt='book'
              className='absolute left-[28px] top-[12px] z-10 rounded-[10px]'
            />
          </>
        )}
        {collection &&
          bookImages.map((book, index) => {
            const { width, className, height } = imageProps[index]
            return (
              <Image
                key={book.id}
                src={book.imageSrc}
                width={width}
                height={height}
                alt='book'
                className={className}
              />
            )
          })}

        <div className='mt-[10px] flex justify-center'>
          <div className='inline-block rounded-lg bg-[#479EFC] px-[6px] py-1 text-[8px] text-white'>
            Текст
          </div>
          <div className='ml-1 inline-block rounded-lg bg-[#FE8D00] px-[6px] py-1 text-[8px] text-white'>
            Аудио
          </div>
        </div>
      </div>

      <div className='flex w-auto flex-col'>
        <div className='flex-1 space-y-[10px]'>
          <h4 className='text-sm font-bold text-white'>
            {collection?.title || 'От хорошего к великому'}
          </h4>
          <p className='text-[10px] text-gray-400'>
            {collection?.author || 'Джим Коллинз'}
          </p>
          <Rating
            number={(collection && Math.round(collection.rating)) || 4}
            size={12}
          />
          <p className='text-[10px] leading-[14px] text-gray-400'>
            {formatTextSize(
              240,
              `Эта аудиокнига рассказывает о том, как хорошая компания может стать великой. В ее основу легли результаты масштабного анализа развития наиболее успешных компаний-долгожителей (Gillette, Kimberly-Clark, Philip Morris, Wells Fargo и др.)`,
            )}
          </p>
        </div>
        {collection ? (
          <Link
            href={`/collection/${collection.id}`}
            className='flex justify-end gap-5'>
            <p className='text-[10px] font-bold text-price'>
              Перейти к сборнику
            </p>
            <button className='h-[16px] w-[16px] rounded-full bg-price'>
              <Image src={arrowRightGray} alt='arrow-right-icon' />
            </button>
          </Link>
        ) : (
          <div className='flex justify-end gap-5'>
            <p className='text-[10px] font-bold text-price'>
              Перейти к сборнику
            </p>
            <button className='h-[16px] w-[16px] rounded-full bg-price'>
              <Image src={arrowRightGray} alt='arrow-right-icon' />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
