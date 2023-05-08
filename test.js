const db = require("./db");

// Test database connection
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database connected.");
});

// Test query to retrieve all employees
db.query("SELECT * FROM employee", (err, results) => {
  if (err) {
    throw err;
  }
  console.log(results);
});
