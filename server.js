const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const ENTRIES = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate purus consequat consequat efficitur. Maecenas dignissim tristique diam, a posuere sem congue ut. Donec nec scelerisque lorem."
  },
  {
    id: 2,
    text: "Phasellus hendrerit magna et finibus ullamcorper. Quisque id diam elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce mauris odio, posuere id diam tincidunt, interdum lobortis odio. Cras vel tellus volutpat, tempus leo nec, consequat urna."
  },
  {
    id: 3,
    text: "Duis mattis vel justo in accumsan. Maecenas lacus lectus, mollis nec feugiat id, rhoncus ut felis. Fusce semper euismod posuere. Aliquam est ipsum, eleifend id diam in, aliquam dapibus nisi."
  },
];

// Add a route to serve all the written messages (entries)
app.get("/entries", (req, res) => {
  res.send(ENTRIES);
});

app.post("/entries", (req, res) => {
  const newEntry = {
    id: ENTRIES.length + 1,
    text: req.body.text,
    // refactor: use ...
    // todo: filter accepted properties
    // accepted_properties = ['text', 'whatever']
    // (make a new filter helper function.
    //   e.g. filterEntryProperties(req.body) )
  };
  ENTRIES.push(newEntry);

  res.send(newEntry);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
