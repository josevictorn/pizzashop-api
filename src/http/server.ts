import { Elysia, t } from 'elysia'
import { restaurants, users } from '../db/schema'
import { db } from '../db/connection'

const app = new Elysia()

app.get(
  '/restaurants',
  async ({ body, set }) => {
    const { restaurantName, managerName, email, phone } = body

    const [manager] = await db
      .insert(users)
      .values({
        name: managerName,
        email,
        phone,
        role: 'manager',
      })
      .returning()

    await db.insert(restaurants).values({
      name: restaurantName,
      managerId: manager!.id,
    })

    set.status = 204
  },
  {
    body: t.Object({
      restaurantName: t.String(),
      managerName: t.String(),
      email: t.String({ format: 'email' }),
      phone: t.String(),
    }),
  },
)

app.listen(3333, () => {
  console.log('Server is running on http://localhost:3333')
})
