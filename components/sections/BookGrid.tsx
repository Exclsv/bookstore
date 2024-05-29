import BookCard from '@/components/BookCard'
import Image from 'next/image'
import Link from 'next/link'
import ArrowRight from '@/app/assets/arrow-right.svg'

export default function BookGrid() {
  return (
    <section className='container'>
      <div className='mb-5 grid grid-cols-2 gap-x-[15px] gap-y-5 tablet:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {Array.from({ length: 10 }).map((_, idx) => (
          <BookCard key={idx} />
        ))}
      </div>
      <Link
        href='/search'
        className='mx-auto block w-[220px] rounded-full bg-circle1 px-5 py-3 text-sm text-white'>
        <span>Найти больше книг</span>
        <Image
          src={ArrowRight}
          alt='arrow-right'
          className='ml-5 inline-block'
        />
      </Link>
    </section>
  )
}
