const express = require("express");
const router = express.Router();
const fs = require("fs");
const csvParser = require("csv-parser");
const db = require("../config/db");

// Migration endpoint to read and migrate data to MySQL
router.post("/migrate-users", async (req, res) => {
  const legacyData = [];

  // Read the legacy data from flat file (e.g., users.txt)
  fs.createReadStream("legacy_system/data/users.txt")
    .pipe(csvParser())
    .on("data", (row) => {
      legacyData.push(row);
    })
    .on("end", () => {
      // Migrate each user to the MySQL database
      legacyData.forEach((user) => {
        const query = "INSERT INTO users (id, name, email) VALUES (?, ?, ?)";
        db.query(query, [user.id, user.name, user.email], (err, result) => {
          if (err) {
            console.error("Error migrating user:", err);
          } else {
            console.log("User migrated:", result);
          }
        });
      });

      res.json({ message: "Data migration complete" });
    });
});

module.exports = router;
