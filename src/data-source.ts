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
        host: "db",
        port: 5432,

        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PWD,
        database: process.env.POSTGRES_DB,

        synchronize: false,
        logging: true,

        entities: ["src/Entities/*.ts"],
        migrations: ["src/Migrations/*.ts"],
      }
)
