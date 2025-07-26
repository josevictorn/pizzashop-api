import { Elysia } from 'elysia'
import { registerRestaurants } from './routes/register-restaurants'

const app = new Elysia().use(registerRestaurants)

app.listen(3333, () => {
  console.log('Server is running on http://localhost:3333')
})
