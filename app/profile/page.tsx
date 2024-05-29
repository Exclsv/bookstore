import MainPageBackground from '@/components/backgrounds/MainPage'
import BookCard from '@/components/BookCard'
import BooksCardExpanded from '@/components/BooksCardExpanded'
import Header from '@/components/Header'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import db from '@/db/db'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/login')

  const bookOrders = await db.order.findMany({
    where: {
      userId: session.user?.id,
      collectionId: null,
    },
  })

  const collectionOrders = await db.order.findMany({
    where: {
      userId: session.user?.id,
      bookId: null,
    },
  })
  const books = await db.book.findMany({
    where: {
      id: {
        in: bookOrders.map(order => order.bookId),
      },
    },
  })
  const collections = await db.collection.findMany({
    where: {
      id: {
        in: collectionOrders.map(order => order.collectionId),
      },
    },
  })
  // console.log(books)

  return (
    <>
      <div className='absolute left-0 top-0 z-[-1] h-full w-full overflow-hidden'>
        <MainPageBackground />
      </div>

      <Header />

      <main className='container mt-16'>
        <h1 className='text-center text-5xl font-bold text-white'>
          Библиотека
        </h1>

        <section className='text-white'>
          <h2 className='text-2xl font-semibold'>Книги</h2>

          {!books.length ? (
            <p className='mt-5'>Ничего не найдено</p>
          ) : (
            <div className='grid grid-cols-2 gap-5 py-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
              {books.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </section>

        <section className='mt-10 text-white'>
          <h2 className='text-2xl font-semibold'>Сборники</h2>
          <div className='mt-10 grid grid-cols-2 gap-x-5  gap-y-10'>
            {collections.map(collection => (
              <BooksCardExpanded key={collection.id} collection={collection} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
