import "https://deno.land/x/reflect_metadata@v0.1.12/mod.ts";
import { Application } from "https://deno.land/x/twet@v0.0.1/mod.ts";
import { PostController } from "./src/controllers/post.controller.ts";
import { initDB } from "./src/config/database/init.ts";

const app = new Application({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
});

// создаём таблицы перед стартом сервера
await initDB();

app.registerController(PostController);

const PORT = 3000;
app.listen(PORT);
console.log(`Server running at http://localhost:${PORT}`);
