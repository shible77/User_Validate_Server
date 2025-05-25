import { mysqlTable, serial, varchar} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 256 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
});

export const user_info = mysqlTable("user_info", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  username: varchar("username", { length: 256 }).notNull().unique(),
  first_name: varchar("first_name", { length: 256 }).notNull(),
  last_name: varchar("last_name", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
})