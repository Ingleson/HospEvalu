import { DataSource } from "typeorm"

require("dotenv").config()

export const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        entities: ["src/Entities/*.ts"],
        synchronize: true,
      }
    : {
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,

        synchronize: false,
        logging: true,

        entities:
          process.env.NODE_ENV === "production"
            ? ["dist/src/Entities/*.js"]
            : ["src/Entities/*.ts"],
        migrations:
          process.env.NODE_ENV === "production"
            ? ["dist/src/Migrations/*.js"]
            : ["src/Migrations/*.ts"],
      }
)
