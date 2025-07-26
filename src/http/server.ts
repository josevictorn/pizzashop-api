import { Elysia, t } from 'elysia'
import { registerRestaurants } from './routes/register-restaurants'
import { sendAuthLink } from './routes/send-auth-link'
import jwt from '@elysiajs/jwt'
import { env } from '../env'
import cookie from '@elysiajs/cookie'

const app = new Elysia()
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      schema: t.Object({
        sub: t.String(),
        restaurantId: t.Optional(t.String()),
      }),
    }),
  )
  .use(cookie())
  .use(registerRestaurants)
  .use(sendAuthLink)

app.listen(3333, () => {
  console.log('Server is running on http://localhost:3333')
})
