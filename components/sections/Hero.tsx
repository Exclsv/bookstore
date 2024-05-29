import Image from 'next/image'
import bookImage from '@/public/book-main.png'
import Link from 'next/link'
import ArrowRight from '@/app/assets/arrow-right.svg'
import Carousel from '@/components/Carousel'

export default function Hero() {
  return (
    <section className='container'>
      <h1 className='mt-[230px] max-w-[500px] text-5xl font-bold text-white'>
        КНИГИ КОТОРЫЕ ТЫ ЕЩЕ НЕ ЧИТАЛ
      </h1>
      <Image
        src={bookImage}
        alt='book'
        priority
        quality={60}
        className='absolute right-0 top-0 z-[-1] translate-x-1/4'
      />
      <Link
        href='/search'
        className='mt-7 inline-block rounded-full bg-circle1 px-5 py-3 text-sm text-white'>
        <span>Найти больше книг</span>

        <Image
          src={ArrowRight}
          alt='arrow-right'
          className='ml-5 inline-block'
        />
      </Link>

      <div className='mt-[230px]'>
        <Carousel />
      </div>
    </section>
  )
}
