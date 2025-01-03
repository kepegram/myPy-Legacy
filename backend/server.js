const express = require("express");
const bodyParser = require("body-parser");
const migrationRoutes = require("./routes/migration");
const app = express();
const connection = require("./config/db");

app.use(bodyParser.json());

// Use migration routes for API endpoint
app.use("/api/migration", migrationRoutes);

// Start the server and connect to MySQL
const PORT = 3000;
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    return;
  }
  console.log("Connected to MySQL!");
  app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
  });
});
