import mysql from "mysql2";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "block",
});

export default db;
