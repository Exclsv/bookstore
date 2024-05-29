import ProductForm from '@/app/admin/_components/ProductForm'
import db from '@/db/db'

export default async function EditBookPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const book = await db.book.findUnique({
    where: { id },
  })
  return (
    <>
      <h1 className='mb-10 text-3xl font-bold text-white'>Редактирование книги</h1>

      <ProductForm book={book} />
    </>
  )
}
