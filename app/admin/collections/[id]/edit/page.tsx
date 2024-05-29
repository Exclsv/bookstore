import {
  getAvailableBooksForCollection,
  getBooksInsideCollection,
} from '@/app/admin/_actions/collections'
import BookCardForCollection from '@/app/admin/_components/BookCardForCollection'
import CollectionForm from '@/app/admin/_components/CollectionForm'
import db from '@/db/db'

export default async function NewCollectionPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const collection = await db.collection.findUnique({ where: { id } })
  const data = await getAvailableBooksForCollection()
  const booksInsideCollection = await getBooksInsideCollection(id)

  return (
    <>
      <h1 className='mb-10 text-3xl font-bold text-white'>
        Редактирование коллекции
      </h1>

      <CollectionForm collection={collection} />

      <section className='mt-14 text-white'>
        <h2 className='mb-5 text-3xl font-bold'>Книги для добавления</h2>
        <div className=' grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {data.map(book => (
            <BookCardForCollection
              insideCollection={false}
              book={book}
              key={book.id}
              collectionId={id}
            />
          ))}
        </div>
      </section>
      <section className='mt-14 text-white'>
        <h2 className='mb-5 text-3xl font-bold'>Книги в коллекции</h2>
        <div className=' grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {booksInsideCollection.map(book => (
            <BookCardForCollection
              insideCollection={true}
              book={book}
              key={book.id}
              collectionId={id}
            />
          ))}
        </div>
      </section>
    </>
  )
}
