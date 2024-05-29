'use server'

import db from '@/db/db'
import { bookEditSchema, bookFormSchema } from '@/zod/schema'
import fs from 'fs/promises'
import { notFound, redirect } from 'next/navigation'

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean,
) {
  await db.book.update({
    where: {
      id,
    },
    data: {
      isAvailableForPurchase,
    },
  })
}

export async function deleteBook(id: string) {
  const book = await db.book.delete({ where: { id } })

  if (book == null) return notFound()

  await fs.unlink(book.filePath)
  await fs.unlink(`public${book.imageSrc}`)
}

export async function addBook(prevState: unknown, formData: FormData) {
  const result = bookFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  await fs.mkdir('books', { recursive: true })
  const filePath = `books/${crypto.randomUUID()}-${data.file.name.trim()}`
  // const fileNameExtenstion = data.file.name.split('.').pop()
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

  await fs.mkdir('public/books', { recursive: true })
  const imagePath = `/books/${crypto.randomUUID()}-${data.image.name.trim()}`
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer()),
  )

  await db.book.create({
    data: {
      title: data.title.trim(),
      slogan: data.slogan.trim(),
      author: data.author.trim(),
      rating: Number.parseFloat(data.rating),
      published: new Date(data.published),
      pages: data.pages,
      description: data.description.trim(),
      price: data.price,

      genre: data.genre.split(','),
      tags: data.tags.split(','),
      formats: ['pdf', 'epub', 'mobi', 'fb2', 'mp3'],

      imageSrc: imagePath,
      filePath,
    },
  })

  redirect('/admin/books')
}

export async function updateBook(
  id: string,
  prevState: unknown,
  formData: FormData,
) {
  const result = bookEditSchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  // ^ Getting the data from the form
  const data = result.data

  // ^ Finding the product
  const book = await db.book.findUnique({
    where: { id },
  })

  if (book == null) return notFound()

  let filePath = book.filePath
  let imagePath = book.imageSrc

  if (data.file != null && data.file.size > 0) {
    await fs.unlink(book.filePath)
    filePath = `books/${crypto.randomUUID()}-${data.file.name.trim()}`
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))
  }

  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${book.imageSrc}`)

    imagePath = `/books/${crypto.randomUUID()}-${data.image.name.trim()}`
    await fs.writeFile(
      `/public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer()),
    )
  }

  await db.book.update({
    where: { id },
    data: {
      title: data.title.trim(),
      slogan: data.slogan.trim(),
      author: data.author.trim(),
      rating: Number.parseFloat(data.rating),
      published: new Date(data.published),
      pages: data.pages,
      description: data.description.trim(),
      price: data.price,

      genre: data.genre.split(','),
      tags: data.tags.split(','),

      filePath,
      imageSrc: imagePath,
    },
  })
}
