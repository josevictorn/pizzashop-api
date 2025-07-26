import { Elysia } from "elysia";

const app = new Elysia();

app.get("/", () => "Hello World!");

export const server = app.listen(3333, () => {
  console.log("Server is running on http://localhost:3333");
});
