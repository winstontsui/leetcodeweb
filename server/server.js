const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Set up your routes and middleware here

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "34.123.247.249",
  user: "root",
  password: "Winston128",
  database: "webleetcode",
});

app.get("/:pageNumber", (req, res) => {
    const pageNumber = req.params.pageNumber;
    // Retrieve data from the database based on pNum = pageNumber
    // You can use pageNumber to query the database and fetch the corresponding data
    pool.query("SELECT * FROM leetcodeproblems WHERE pNum = ?", [pageNumber], (error, results, fields) => {
      if (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    });
  });

  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

