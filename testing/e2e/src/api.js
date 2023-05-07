const { once } = require("node:events");
const http = require("node:http");


const DEFAULT_USER = {
  username: "john",
  password: "123"
}

const routes = {
  "/profile:get": (req, res) => {
    return res.end("Hello user")
  },
  "/login:post": async (req, res) => {
    const data = JSON.parse(await once(req, "data"));

    // curl -d '{"username":"john","password":"1234"}' localhost:3000/login
    if (data.username !== DEFAULT_USER.username || 
        data.password !== DEFAULT_USER.password) {
          res.writeHead(401);
          return res.end("Invalid username or password")
    }

    // curl -d '{"username":"john","password":"123"}' localhost:3000/login
    return res.end("User logged in")
  },
  "notFound": (req, res) => {
    res.writeHead(404);
    return res.end("Route not found")
  }
}

const app = http.createServer((req, res) => {
  const routeKey = `${req.url.toLocaleLowerCase()}:${req.method.toLocaleLowerCase()}`
  const handler = routes[routeKey] || routes["notFound"];
  return handler(req, res);
});

// app.listen(3000, () => {
//   console.log("Server running at 3000");
// });

module.exports = app;