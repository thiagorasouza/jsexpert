import fs from "node:fs";
import http from "node:http";

http.createServer((req, res) => {
    fs.createReadStream("./big.file").pipe(res);
}).listen(3000, () => {
    console.log("Server listening on 3000");
});