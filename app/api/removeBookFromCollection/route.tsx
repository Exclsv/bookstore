import { addBookToCollection, removeBookFromCollection } from '@/app/admin/_actions/collections'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { bookId, collectionId } = await body
  try {
    const updatedBook = await removeBookFromCollection(bookId, collectionId)
    return NextResponse.json(
      {
        updatedBook,
      },
      {
        status: 200,
      },
    )
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      {
        message: 'Something went wrong',
      },
      {
        status: 500,
      },
    )
  }
}
