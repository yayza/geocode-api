const express = require("express");
const server = express();
const location = require("./db/queries");
const requestHandlers = require("./requestHandlers");

const PORT = process.env.PORT || 3000;

server.use(requestHandlers.handleAllRequests);

server.get("/geo/:city?/:state?", requestHandlers.handleGeoCodeRequest, async (req, res) => {
  const city = req.params?.city;
  const state = req.params?.state;

  const coords = await location.getCoords(city, state);
  res.send(coords);
});

server.listen(PORT, () => {
  console.log("Server started");
});
