import { connection } from "./db.ts";

export async function initDB() {
  await connection.connect();
  console.log("✅ Database connected")
  // Создание таблицы posts, если её нет
  await connection.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id CHAR(26) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      image_url VARCHAR(1024),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("✅ Tables checked/created");
}
