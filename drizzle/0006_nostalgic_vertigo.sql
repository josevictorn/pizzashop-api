ALTER TABLE "order_items" DROP CONSTRAINT "order_items_restaurant_id_restaurants_id_fk";
--> statement-breakpoint
ALTER TABLE "order_items" DROP COLUMN "restaurant_id";