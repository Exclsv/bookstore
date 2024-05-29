import db from '@/db/db'
import { accountSchema } from '@/zod/schema'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

// ^ This route handler is not used and handled in this app. Just an alternative way for creating an account
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { email, password } = accountSchema.parse(body)

    // check for existing user
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return NextResponse.json(
        {
          message: 'User with this email already exists',
        },
        { status: 409 },
      )
    }

    const hashedPassword = await hash(password, 12)

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'customer',
      },
    })

    const { password: newUserPassword, ...rest } = newUser

    return NextResponse.json(
      { user: rest, message: 'User created successfully' },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    )
  }
}
