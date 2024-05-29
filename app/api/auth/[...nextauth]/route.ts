import db from '@/db/db'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import { compare } from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { CustomUser } from '@/types/auth'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password,
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id + '',
          email: user.email,
          randomKey: 'Hey cool',
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      // console.log('Session Callback', { session, token })
      return {
        ...session,
        user: token as CustomUser
        // user: {
          // ...session.user,
          // id: token.id,
          // randomKey: token.randomKey,
          // role: token.role,
        // },
      }
    },
    jwt: ({ token, user }) => {
      // console.log('JWT Callback', { token, user })
      if (user) {
        // const u = user as unknown as any
        const u = user as CustomUser
        return {
          ...token,
          id: u.id,
          role: u.role,
          randomKey: u.randomKey,
        }
      }
      return token
    }
  },
  pages: {
    signIn: '/login',
  },
}

const hanlder = NextAuth(authOptions)
export { hanlder as GET, hanlder as POST }
