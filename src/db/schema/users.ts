import { createId } from '@paralleldrive/cuid2'
import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { orders, restaurants } from '.'
import { relations } from 'drizzle-orm'

export const userRoleEnum = pgEnum('user_role', ['manager', 'customer'])

export const users = pgTable('users', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  role: userRoleEnum('role').notNull().default('customer'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const usersRelations = relations(users, ({ one, many }) => {
  return {
    managedRestaurants: one(restaurants, {
      fields: [users.id],
      references: [restaurants.managerId],
      relationName: 'restaurant_manager',
    }),
    orders: many(orders),
  }
})
