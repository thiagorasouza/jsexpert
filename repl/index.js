const http = require("node:http");
const { URLSearchParams } = require("node:url");

const server = http.createServer();

function calculateNetPay(salary, tax) {
    return salary * (1 - tax);
}

server.on("request", (req, res) => {
    const url = new URLSearchParams(req.url.slice(1));
    const params = Object.fromEntries(url);
    const netPay = calculateNetPay(params.salary, params.tax);
    console.log(`Net pay: ${netPay}. Process ID: ${process.pid}`)
    debugger;
    res.end(`Net pay: ${netPay}`);
});

server.listen(5000, () => {
    console.log("Server listening on port 5000");
});