import Header from '@/components/Header'
import Image from 'next/image'
import maria from '@/public/bookImages/maria.png'
import pofigism from '@/public/bookImages/pofigizm.png'
import goodToGreat from '@/public/bookImages/good-to-great-2.png'
import Rating from '@/components/Rating'
import { RiPriceTag3Line } from 'react-icons/ri'
import { FiBook } from 'react-icons/fi'
import BookCard from '@/components/BookCard'
import Footer from '@/components/sections/Footer'
import db from '@/db/db'
import { getBooksInsideCollection } from '@/app/admin/_actions/collections'
import { formatCurrency } from '@/lib/formatter'
import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { MdOutlineFileDownload } from 'react-icons/md'

export default async function page({
  params: { id },
}: {
  params: { id: string }
}) {
  const collection = await db.collection.findUnique({ where: { id } })
  const booksInsideCollection = await getBooksInsideCollection(id)
  console.log(Math.max(4, 6, -1, 3, 10, 4))

  if (collection == null) return notFound()

  const session = await getServerSession(authOptions)

  const isAuthenticated = !!session

  if (!isAuthenticated) redirect('/login')

  const isPurchased = await db.order.findFirst({
    where: {
      collectionId: collection.id,
      userId: session?.user?.id,
    },
  })

  const purchaseCollection = async () => {
    'use server'

    await db.order.create({
      data: {
        collectionId: collection.id,
        price: collection.price,
        userId: session.user?.id,
      },
    })

    revalidatePath('/collection/[id]')
  }

  return (
    <>
      <Header />
      <main className='container mb-32'>
        <section className='mt-12 flex gap-[30px]'>
          <div className='relative flex-grow-[1] basis-1/3 rounded-2xl bg-stone-900/60 p-5 pb-14 pr-10 backdrop-blur-md'>
            <div className='absolute bottom-8 left-10 right-5 top-10 z-10'>
              <Image
                src={pofigism}
                alt='maria-book'
                className='absolute inset-0 h-full w-full'
              />
            </div>
            <div className='absolute bottom-[42px] left-7 right-9 top-7 z-20'>
              <Image
                src={goodToGreat}
                alt='lie-book'
                className='absolute inset-0 h-full w-full'
              />
            </div>

            <Image
              src={maria}
              alt='maria-book'
              className='relative left-0 top-0 z-30 w-[96%]'
            />
          </div>
          <div className='flex-grow-[3] basis-2/3 text-white'>
            <h2 className='text-5xl font-semibold leading-[48px]'>
              Серия «Сборники саммари Smart Reading»
            </h2>
            <div className='relative mt-5 space-y-[10px] rounded-2xl bg-stone-900/60 p-5 backdrop-blur-md'>
              <div className='absolute right-5 top-0 -translate-y-1/2'>
                <div className='inline-block rounded-[15px] bg-[#479EFC] px-3 py-2 text-xs text-white'>
                  Текст
                </div>
                <div className='ml-[6px] inline-block rounded-[15px] bg-[#FE8D00] px-3 py-2 text-xs text-white'>
                  Аудио
                </div>
              </div>
              <p className='text-sm'>
                <span className='mr-[10px] font-bold'>Автор:</span>
                {collection?.author || 'Smart Reading'}
              </p>
              <div className='flex items-center gap-[10px]'>
                <p className='text-sm font-bold'>Рейтинг:</p>
                <Rating number={4} size={14} />
                <p className='text-sm'>{collection?.rating || '4,1'}</p>
              </div>
              <p className='text-sm'>
                <span className='mr-[10px] font-bold'>Объем:</span>
                {collection?.numberOfBooks || '4'} книги
              </p>
              <p className='text-sm'>
                <span className='mr-[10px] font-bold'>
                  Форматы для скачивания:
                </span>
                fb2, txt, epub, pdf, mp3
              </p>
            </div>
            <div className='mt-5 flex flex-wrap gap-[30px] tablet:flex-nowrap'>
              <div className='flex w-full items-center justify-center gap-5 rounded-[20px] bg-price py-[10px]'>
                <RiPriceTag3Line size={24} className='scale-x-[-1]' />
                <p className='font-semibold uppercase'>
                  {collection
                    ? formatCurrency(collection?.price)
                    : '1 222 230 USZ'}
                </p>
              </div>
              {session?.user && !isPurchased ? (
                <form action={purchaseCollection} className='w-full'>
                  <button
                    type='submit'
                    className='flex w-full items-center justify-center gap-5 rounded-[20px] bg-green-500 py-[10px] hover:bg-green-600'>
                    <FiBook size={24} />
                    <p className='font-semibold'>Купить</p>
                  </button>
                </form>
              ) : (
                <button className='flex w-full items-center justify-center gap-5 rounded-[20px] bg-blue-500 py-[10px] hover:bg-blue-600'>
                  <FiBook size={24} />
                  <p className='font-semibold'>Куплен</p>
                </button>
              )}
            </div>
          </div>
        </section>
        <section className='mt-5'>
          <h3 className='mb-5 text-2xl font-bold text-white'>
            Результаты{' '}
            <span className='font-light text-[#999999]'>
              {collection?.numberOfBooks || '4'}
            </span>
          </h3>
          <div className='grid grid-cols-2 gap-x-[15px] gap-y-5 tablet:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {booksInsideCollection.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
