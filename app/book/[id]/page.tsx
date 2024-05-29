import Header from '@/components/Header'
import Image from 'next/image'
import { CiBookmark } from 'react-icons/ci'
import Rating from '@/components/Rating'
import { RiPriceTag3Line } from 'react-icons/ri'
import { FiBook } from 'react-icons/fi'
import BookCard from '@/components/BookCard'
import Footer from '@/components/sections/Footer'
import db from '@/db/db'
import { notFound, redirect } from 'next/navigation'
import { formatCurrency } from '@/lib/formatter'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { MdOutlineFileDownload } from 'react-icons/md'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export default async function page({
  params: { id },
}: {
  params: { id: string }
}) {
  const book = await db.book.findUnique({
    where: { id },
  })

  if (!book) notFound()

  const session = await getServerSession(authOptions)

  const isAuthenticated = !!session

  if (!isAuthenticated) redirect('/login')

  const isPurchased = await db.order.findFirst({
    where: {
      bookId: book.id,
      userId: session?.user?.id,
    },
  })

  const purchaseBook = async () => {
    'use server'

    await db.order.create({
      data: {
        bookId: book.id,
        price: book.price,
        userId: session.user?.id,
      },
    })

    revalidatePath('/book/[id]')
  }

  return (
    <>
      <Header />
      <main className='container mb-32'>
        <section className='mt-12 flex gap-[30px]'>
          <div>
            <div className='relative flex-grow-[1] basis-1/3 rounded-[20px] bg-stone-900/60 p-5 backdrop-blur-md'>
              <Image
                src={book.imageSrc}
                alt='maria-book'
                width={310}
                height={418}
                className='w-full rounded-[20px] object-cover'
              />
            </div>
            <div className='mt-5 flex w-full items-center justify-center gap-5 rounded-[20px] bg-price py-[10px] text-white'>
              <RiPriceTag3Line size={24} className='scale-x-[-1]' />
              <p className='font-semibold uppercase'>
                {formatCurrency(book.price)}
              </p>
            </div>
          </div>
          <div className='flex-grow-[3] basis-2/3 text-white'>
            <h2 className='text-5xl font-semibold leading-[48px]'>
              {book.title}
            </h2>
            <p className='my-5 text-sm'>{book.slogan}</p>
            <div className='relative space-y-[10px] rounded-2xl bg-stone-900/60 p-5 backdrop-blur-md'>
              <div className='absolute right-5 top-0 -translate-y-1/2'>
                <div className='inline-block rounded-[15px] bg-[#479EFC] px-3 py-2 text-xs text-white'>
                  Текст
                </div>
                <div className='ml-[6px] inline-block rounded-[15px] bg-[#FE8D00] px-3 py-2 text-xs text-white'>
                  Аудио
                </div>
              </div>
              <p className='!m-0 text-sm'>
                <span className='mr-[10px] font-bold'>Автор:</span>
                {book.author}
              </p>
              <div className='flex items-center gap-[10px]'>
                <p className='text-sm font-bold'>Рейтинг:</p>
                <Rating number={4} size={14} />
                <p className='text-sm'>{book.rating}</p>
              </div>
              <p className='text-sm'>
                <span className='mr-[10px] font-bold'>Дата выхода:</span>
                {new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long' }).format(
                  book.published,
                )}
              </p>
              <p className='text-sm'>
                <span className='mr-[10px] font-bold'>Объем:</span>
                {book.pages} стр.
              </p>
              <p className='text-sm'>
                <span className='mr-[10px] font-bold'>Жанр:</span>
                <span className='text-price underline'>
                  {book.genre.join(',')}
                </span>
              </p>
              <p className='text-sm'>
                <span className='mr-[10px] font-bold'>Теги:</span>
                <span className='text-price underline'>
                  {book.tags.join(',')}
                </span>
              </p>
              <p className='text-sm'>
                <span className='mr-[10px] font-bold'>
                  Форматы для скачивания:
                </span>
                fb2, txt, epub, pdf, mp3
              </p>
            </div>
            <div className='mt-5 flex flex-wrap gap-[30px] tablet:flex-nowrap'>
              <button className='flex w-full items-center justify-center gap-5 rounded-[20px] bg-[#FE8D00] py-[10px] hover:bg-orange-500'>
                <CiBookmark size={24} strokeWidth={1} />
                <p className='font-semibold'>Добавить в библиотеку</p>
              </button>
              {session?.user && !isPurchased ? (
                <form action={purchaseBook} className='w-full'>
                  <button
                    type='submit'
                    className='flex w-full items-center justify-center gap-5 rounded-[20px] bg-green-500 py-[10px] hover:bg-green-600'>
                    <FiBook size={24} />
                    <p className='font-semibold'>Купить</p>
                  </button>
                </form>
              ) : (
                <a
                  href={`/book/${book.id}/download`}
                  className='flex w-full items-center justify-center gap-5 rounded-[20px] bg-blue-500 py-[10px] hover:bg-blue-600'>
                  <MdOutlineFileDownload size={24} />
                  <p className='font-semibold'>Скачать</p>
                </a>
              )}
            </div>
          </div>
        </section>
        <section className='mt-5'>
          <h3 className='mb-5 text-2xl font-bold text-white'>Описание книги</h3>
          <p className='rounded-[20px] bg-stone-900/60 p-5 text-sm text-white backdrop-blur-lg '>
            {book.description}
          </p>
        </section>

        <section className='mt-5'>
          <h3 className='mb-5 text-2xl font-bold text-white'>Рекомендации</h3>
          <div className='grid grid-cols-2 gap-x-[15px] gap-y-5 tablet:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {Array.from({ length: 4 }).map((_, idx) => (
              <BookCard key={idx} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
