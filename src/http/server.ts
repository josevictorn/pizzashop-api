import { Elysia } from 'elysia'
import { registerRestaurants } from './routes/register-restaurants'
import { sendAuthLink } from './routes/send-auth-link'
import { authLinkFromCode } from './routes/authenticate-from-link'
import { signOut } from './routes/sign-out'
import { getProfile } from './routes/get-profile'
import { getManagedRestaurant } from './routes/get-managed-restaurant'
import { getOrderDetails } from './routes/get-order-details'

const app = new Elysia()
  .use(registerRestaurants)
  .use(sendAuthLink)
  .use(authLinkFromCode)
  .use(signOut)
  .use(getProfile)
  .use(getManagedRestaurant)
  .use(getOrderDetails)
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'VALIDATION': {
        set.status = error.status

        return error.toResponse()
      }
      default: {
        console.error(error)

        return new Response(null, { status: 500 })
      }
    }
  })

app.listen(3333, () => {
  console.log('Server is running on http://localhost:3333')
})
