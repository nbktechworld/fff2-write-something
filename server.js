const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "write-something-user",
  password: process.env.MYSQL_PASSWORD,
  database: "write_something_development",
});
connection.connect();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Add a route to serve all the written messages (entries)
app.get("/entries", (req, res) => {
  connection.query("SELECT * FROM entries;", function (error, results, fields) {
    if (error) {
      console.error(`ERROR: ${error.message}`);
      res.send([]);
      return;
    }

    res.send(results);
  });
});

app.post("/entries", (req, res) => {
  const newEntry = {
    text: req.body.text,
    // refactor: use ...
    // todo: filter accepted properties
    // accepted_properties = ['text', 'whatever']
    // (make a new filter helper function.
    //   e.g. filterEntryProperties(req.body) )
  };
  // invalid cases: undefined, null, ""
  if (newEntry.text == null || newEntry.text === "") {
    res.status(422).send({ error: "Entry text is required." });
    return;
  }
  else if (newEntry.text.length > 256) {
    res.status(422).send({ error: "Entry text is at most 256 characters."});
    return;
  }

  connection.query("INSERT INTO entries SET ?", newEntry, function(error, results, fields) {
    if (error) {
      res.status(500).send({ error: "Failed to create new entry. Please try again later." });
      return;
    }

    newEntry.id = results.insertId;
    res.send(newEntry);
  });
});

const server = app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

const onShutdown = () => {
  console.log("Closing connection to the database.");
  connection.end();
  console.log("Closing the server.");
  server.close();
};
process.on("SIGINT", onShutdown);
process.on("SIGTERM", onShutdown)
