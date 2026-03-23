import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql
    .createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME, // db_backend
        dateStrings: true, // dates as strings to avoid timezone issues
        connectionLimit: 10,
        charset: "utf8mb4", // prevent accent issues
    })
    .promise();