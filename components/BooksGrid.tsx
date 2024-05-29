import { Book } from '@prisma/client'
import BookCard from './BookCard'

export default function BooksGrid({ books }: { books: Book[] }) {
  return (
    <>
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </>
  )
}
