import mysql from "mysql"
import {load} from "@std/dotenv";
const env = await load()
export const connection = mysql.createConnection({
    host: env.MYSQL_HOST || "localhost",
    port: Number(env.MYSQL_PORT || "3306"),
    user: env.MYSQL_USER || "root",
    password: env.MYSQL_PASSWORD || "",
    database: env.MYSQL_DATABASE || "test",
})

