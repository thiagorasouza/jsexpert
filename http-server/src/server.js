const http = require("node:http");

const server = http.createServer();

server.on("request", (req, res) => {
  const { method, url } = req;
  console.log(`${method}: ${url}`);

  req.on("data", (data) => {
    console.log(data.toString("utf-8"));
  });
  req.on("end", () => {
    console.log("Finished buffering");
  });

  res.end();
});

server.listen(3000, () => {
  console.log("Server listening on 3000.");
});
