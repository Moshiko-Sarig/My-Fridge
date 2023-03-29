const db = require("mysql");

const pool = db.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME
});

console.log("Connected to database");

function executeQueryAsync(sqlCmd, values) { 
  return new Promise((resolve, reject) => {
    pool.query(sqlCmd, values, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = {
  executeQueryAsync
};
