import Elysia, { t } from 'elysia'
import { db } from '../../db/connection'
import { createId } from '@paralleldrive/cuid2'
import { authLinks } from '../../db/schema'
import { env } from '../../env'
import { mail } from '../../lib/mail'
import nodemailer from 'nodemailer'

export const sendAuthLink = new Elysia().post(
  '/authenticate',
  async ({ body }) => {
    const { email } = body

    const userFromEmail = await db.query.users.findFirst({
      where(fileds, { eq }) {
        return eq(fileds.email, email)
      },
    })

    if (!userFromEmail) {
      throw new Error('User not found')
    }

    const authLinkCode = createId()

    await db.insert(authLinks).values({
      code: authLinkCode,
      userId: userFromEmail.id,
    })

    const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL)

    authLink.searchParams.set('code', authLinkCode)
    authLink.searchParams.set('redirect', env.API_REDIRECT_URL)

    const info = await mail.sendMail({
      from: {
        name: 'Pizzashop',
        address: 'hi@pizzashop.com',
      },
      to: email,
      subject: 'Authenticate to Pizzashop',
      html: `
        <p>Click the link below to authenticate:</p>
        <a href="${authLink.toString()}">${authLink.toString()}</a>
      `,
    })

    console.log(nodemailer.getTestMessageUrl(info))
  },
  {
    body: t.Object({
      email: t.String({ format: 'email' }),
    }),
  },
)
