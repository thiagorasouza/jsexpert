const http = require("node:http");
const DEFAULT_CREDENTIALS = { username: "thiago", password: "123456" };

const routes = {
  "/contact:get": (req, res) => {
    res.end("Contact Us Page");
  },
  "/login:post": async (req, res) => {
    for await (const data of req) {
      const user = JSON.parse(data);
      if (
        user.username !== DEFAULT_CREDENTIALS.username ||
        user.password !== DEFAULT_CREDENTIALS.password
      ) {
        res.writeHead(401);
        return res.end("Login failed");
      } else {
        return res.end("Login succeeded");
      }
    }
  },
  default: (req, res) => {
    res.end("Default route");
  },
};

function handler(req, res) {
  const { url, method } = req;
  const routeKey = `${url}:${method.toLowerCase()}`;
  // if (routeKey === null) return;
  const route = routes[routeKey] || routes.default;
  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  return route(req, res);
}

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("Server listening on 3000."));

module.exports = app;
