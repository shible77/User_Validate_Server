"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_info = exports.users = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
exports.users = (0, mysql_core_1.mysqlTable)("users", {
    id: (0, mysql_core_1.serial)("id").primaryKey(),
    username: (0, mysql_core_1.varchar)("username", { length: 256 }).notNull().unique(),
    password: (0, mysql_core_1.varchar)("password", { length: 256 }).notNull(),
});
exports.user_info = (0, mysql_core_1.mysqlTable)("user_info", {
    id: (0, mysql_core_1.serial)("id").primaryKey(),
    email: (0, mysql_core_1.varchar)("email", { length: 256 }).notNull().unique(),
    username: (0, mysql_core_1.varchar)("username", { length: 256 }).notNull().unique(),
    first_name: (0, mysql_core_1.varchar)("first_name", { length: 256 }).notNull(),
    last_name: (0, mysql_core_1.varchar)("last_name", { length: 256 }).notNull(),
    password: (0, mysql_core_1.varchar)("password", { length: 256 }).notNull(),
});
