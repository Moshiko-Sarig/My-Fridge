import mysql, { Pool, MysqlError, FieldInfo } from "mysql";

const pool: Pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "my_fridge"
});

console.log("Connected to database");

async function executeQueryAsync(sqlCmd: string, values: any[] = []): Promise<any> {
  return new Promise((resolve, reject) => {
    pool.query(sqlCmd, values, (err: MysqlError | null, rows: any, fields?: FieldInfo[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export { executeQueryAsync };
