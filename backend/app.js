const express = require("express");
const bodyParser = require("body-parser");
const csvParser = require("csv-parser");
const fs = require("fs");
const mysql = require("mysql2");
const app = express();

app.use(bodyParser.json());

// Set up MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yourpassword",
  database: "legacy_system",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Could not connect to database", err);
  } else {
    console.log("Connected to database");
  }
});

// Route to get data from the legacy system (CSV)
app.get("/legacy-data", (req, res) => {
  const legacyData = [];
  fs.createReadStream("legacy_data.csv")
    .pipe(csvParser())
    .on("data", (row) => {
      legacyData.push(row);
    })
    .on("end", () => {
      res.json(legacyData);
    });
});

// Route to update legacy data
app.post("/update-data", (req, res) => {
  const { id, name, email } = req.body;

  if (!id || !name || !email) {
    return res.status(400).json({ error: "ID, name, and email are required" });
  }

  // Simulate updating the data (you could write to the file or directly to the DB)
  const updatedData = { id, name, email };

  // Save the updated data into the flat file (CSV)
  fs.appendFile("legacy_data.csv", `${id},${name},${email}\n`, (err) => {
    if (err) {
      return res.status(500).json({ error: "Error updating legacy data" });
    }
    res.json({ message: "Data updated successfully", data: updatedData });
  });
});

// Route to migrate data to the database
app.post("/migrate-data", (req, res) => {
  const legacyData = [];

  // Read the legacy CSV file and prepare the data
  fs.createReadStream("legacy_data.csv")
    .pipe(csvParser())
    .on("data", (row) => {
      legacyData.push(row);
    })
    .on("end", () => {
      legacyData.forEach((row) => {
        const { id, name, email } = row;

        // Migrate to the relational database
        const query = "INSERT INTO users (id, name, email) VALUES (?, ?, ?)";
        db.query(query, [id, name, email], (err, result) => {
          if (err) {
            console.error("Error migrating data", err);
          } else {
            console.log("Data migrated", result);
          }
        });
      });
      res.json({ message: "Data migration complete" });
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
