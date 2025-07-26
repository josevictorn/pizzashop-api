import { Elysia } from 'elysia'
import { registerRestaurants } from './routes/register-restaurants'
import { sendAuthLink } from './routes/send-auth-link'

const app = new Elysia().use(registerRestaurants).use(sendAuthLink)

app.listen(3333, () => {
  console.log('Server is running on http://localhost:3333')
})
