import { type GetServerSidePropsContext } from 'next'
import { getServerSession, type NextAuthOptions, type DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { env } from '~/env.mjs'
import { SiweMessage } from 'siwe'
import { prisma } from '~/server/db'
import { getCsrfToken } from 'next-auth/react'
import { IncomingMessage } from 'http'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    address: string | undefined | null
    user: {
      name: string | undefined | null
      description: string | undefined | null
      picture: string | undefined | null
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user']
  }
}

export async function verifySiweMessage(credentials: Record<'message' | 'signature', string> | undefined, req: IncomingMessage) {
  const siwe = new SiweMessage(JSON.parse(credentials?.message || '{}'))

  // Make sure the domain matches
  let nextAuthHost = ''
  const nextAuthUrl = process.env.NEXTAUTH_URL || null

  if (process.env.NODE_ENV === 'development') nextAuthHost = req.headers.host || ''
  else if (!nextAuthUrl) return null
  else nextAuthHost = new URL(nextAuthUrl).host

  // Make sure the nonce, domain, and signature are valid
  if (siwe.domain !== nextAuthHost || siwe.nonce !== (await getCsrfToken({ req })) || !(await siwe.validate(credentials?.signature || ''))) return null

  return siwe
}

export function getAuthOptions(req: IncomingMessage): NextAuthOptions {
  const providers = [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          // Verify the message
          const siwe = await verifySiweMessage(credentials, req)

          // If the message is invalid, bad request
          if (!siwe) return null

          // Fetch user by address
          let user = await prisma.user.findUnique({
            where: { address: siwe.address },
          })

          // If user doesn't exist, bad request
          if (!user) return null

          // Return the user info
          return {
            id: user.address,
            name: user.name,
            description: user.description,
            picture: user.picture,
          }
        } catch (e) {
          return null
        }
      },
      credentials: {
        message: {
          label: 'Message',
          placeholder: '0x0',
          type: 'text',
        },
        signature: {
          label: 'Signature',
          placeholder: '0x0',
          type: 'text',
        },
      },
      name: 'Ethereum',
    }),
  ]

  return {
    callbacks: {
      async session({ session, token }) {
        let user = await prisma.user.findUnique({
          where: { address: token.sub },
        })

        session.address = token.sub
        session.user = {
          name: user?.name,
          description: user?.description,
          picture: user?.picture,
        }
        return session
      },
    },
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    secret: process.env.NEXTAUTH_JWT_SECRET,
    session: {
      strategy: 'jwt',
    },
  }
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: { req: GetServerSidePropsContext['req']; res: GetServerSidePropsContext['res'] }) => {
  return getServerSession(ctx.req, ctx.res, getAuthOptions(ctx.req))
}
