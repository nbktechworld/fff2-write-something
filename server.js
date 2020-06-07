const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// Add a route to serve all the written messages (entries)
app.get("/entries", (req, res) => {
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

  res.send(ENTRIES);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
