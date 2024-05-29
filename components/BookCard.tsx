import Image from 'next/image'
import arrowRightGray from '@/app/assets/arrow-right-gray.svg'
import Rating from './Rating'
// import maria from '@/public/bookImages/maria.png'
import { Book } from '@prisma/client'
import { formatCurrency } from '@/lib/formatter'
import Link from 'next/link'
import maria from '@/public/bookImages/maria.png'

export default function BookCard({ book }: { book?: Book }) {
  return (
    <div className=' rounded-xl bg-stone-900/60 p-5 font-semibold text-white backdrop-blur-lg'>
      <h4 className='mb-[10px] text-sm '>
        {book?.author || 'Мария Метлицкая'}
      </h4>
      <div className='relative'>
        <Image
          src={book?.imageSrc || maria}
          width={170}
          height={230}
          className='aspect-[170/230] w-full rounded-xl object-cover'
          alt='book'
          priority
          quality={60}
        />
        <div className='absolute bottom-2 right-2'>
          <div className='inline-block rounded-lg bg-[#479EFC] px-[6px] py-1 text-[8px] text-white'>
            Текст
          </div>
          <div className='ml-1 inline-block rounded-lg bg-[#FE8D00] px-[6px] py-1 text-[8px] text-white'>
            Аудио
          </div>
        </div>
      </div>
      <p className='mb-[5px] mt-[10px] text-center text-xs'>
        {book?.title || 'Цветы и птицы Цветы и птицы'}
      </p>
      <Rating number={book?.rating || 4} position='center' size={11} />
      <div className='mt-1 flex justify-between'>
        <p className='text-[10px] font-bold text-price'>
          {(book && formatCurrency(book.price)) || '1 222 230 UZS'}
        </p>
        {book ? (
          <Link
            href={`/book/${book?.id}`}
            className='h-[16px] w-[16px] rounded-full bg-price'>
            <Image src={arrowRightGray} alt='arrow-right-icon' />
          </Link>
        ) : (
          <div className='h-[16px] w-[16px] rounded-full bg-price'>
            <Image src={arrowRightGray} alt='arrow-right-icon' />
          </div>
        )}
      </div>
    </div>
  )
}
