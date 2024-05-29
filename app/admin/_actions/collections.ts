'use server'

import db from '@/db/db'
import { collectionFormSchema } from '@/zod/schema'
import { Book } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { notFound, redirect } from 'next/navigation'

export async function deleteCollection(id: string) {
  const collection = await db.collection.delete({ where: { id } })

  if (collection == null) return notFound()
}
export async function addCollection(prevState: unknown, formData: FormData) {
  const result = collectionFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  await db.collection.create({
    data: {
      title: data.title.trim(),
      author: data.author.trim(),
      rating: Number.parseFloat(data.rating),
      price: data.price,
      numberOfBooks: 0,
    },
  })

  redirect('/admin/collections')
}

export async function updateCollection(id: string, prevState: unknown, formData: FormData) {
  const result = collectionFormSchema.safeParse(Object.fromEntries(formData.entries()))

  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data
  console.log(data);
  

  await db.collection.update({
    where: {id},
    data: {
      title: data.title.trim(),
      author: data.author.trim(),
      rating: Number.parseFloat(data.rating),
      price: data.price
    }
  })

  revalidatePath('/admin/collections', 'page')
  revalidatePath('/admin/[id]/edit', 'page')
}

export const getAvailableBooksForCollection = async () => {
  return db.book.findMany({
    where: {
      isAvailableForPurchase: true,
      collectionId: null,
    },
    orderBy: {
      title: 'asc',
    },
  })
}

export const getBooksInsideCollection = async (collectionId: string) => {
  return db.book.findMany({
    where: {
      collectionId,
    },
  })
}

export const addBookToCollection = async (
  bookId: string,
  collectionId: string,
) => {
  try {
    const updatedBook = await db.book.update({
      where: {
        id: bookId,
      },
      data: {
        collectionId,
      },
    })
    const updatedCollection = await db.collection.update({
      where: { id: collectionId },
      data: {
        numberOfBooks: { increment: 1 },
      },
    })
    return { updatedBook, updatedCollection }
  } catch (e) {
    console.log(e)
  }
}

export const removeBookFromCollection = async (
  bookId: string,
  collectionId: string,
) => {
  try {
    const updatedBook = await db.book.update({
      where: {
        id: bookId,
      },
      data: {
        collectionId: null,
      },
    })
    const updatedCollection = await db.collection.update({
      where: { id: collectionId },
      data: {
        numberOfBooks: { decrement: 1 },
      },
    })
    return { updatedBook, updatedCollection }
  } catch (e) {
    console.log(e)
  }
}
