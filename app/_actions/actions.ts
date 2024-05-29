'use server'

import db from '@/db/db'
import { accountSchema } from '@/zod/schema'
import { Book, Collection } from '@prisma/client'
import { hash } from 'bcrypt'
import { redirect } from 'next/navigation'

export async function createAccount(prevState: unknown, formData: FormData) {
  const result = accountSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  // check for existing user
  const existingUser = await db.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (existingUser) {
    return {
      email: 'User with this email already exists',
      password: '',
    }
  }

  const hashedPassword = await hash(data.password, 12)

  // result.data
  await db.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      role: 'customer',
    },
  })

  redirect('/login')
}

export async function getBooks():Promise<Book[]> {
  let res: any
  try {
    res = await db.book.findMany({
      where: {
        isAvailableForPurchase: true,
      },
    })
  } catch (error) {
    console.error(error)
    return []
  }

  if (!res) {
    console.error('getBooks: res is null')
    return []
  }

  return res
}

export async function getCollections():Promise<Collection[]> {
  let res: any
  try {
    res = await db.collection.findMany({
      where: {
        isAvailableForPurchase: true,
      },
    })
  } catch (error) {
    console.error(error)
    return []
  }

  if (!res) {
    console.error('getCollections: res is null')
    return []
  }

  return res
}
