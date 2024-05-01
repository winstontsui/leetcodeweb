const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const dbConfig = require("./dbconfig"); // dbconfig.js file contains my database connection information.
// const dbConfig = {
//   connectionLimit: 10,
//   host: "",
//   user: "",
//   password: "",
//   database: "",
// };

// module.exports = dbConfig;

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Set up your routes and middleware here
const pool = mysql.createPool(dbConfig); // Use the imported database configuration

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.get("/:pageNumber", (req, res) => {
  const pageNumber = req.params.pageNumber;
  // Retrieve data from the database based on pNum = pageNumber
  // You can use pageNumber to query the database and fetch the corresponding data
  pool.query(
    "SELECT * FROM leetcodeproblems WHERE pNum = ?",
    [pageNumber],
    (error, results, fields) => {
      if (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
