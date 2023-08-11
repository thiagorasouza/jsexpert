const fs = require("node:fs");

// Closing
const fileHandle = fs.open(__filename);

// I/O
fs.readFile(__filename, () => {
  console.log("#7 fs.readFile() before I/O polling");
});

// setImmediate
setImmediate(() => {
  console.log("#6 setImmediate()");
});

// Timers
setTimeout(() => {
  console.log("#3 setTimeout()");
  process.nextTick(() => {
    console.log("#4 process.nextTick() between timers");
  });
}, 0);

setTimeout(() => {
  console.log("#5 setTimeout()");
}, 0);

// Promises
Promise.resolve().then(() => {
  console.log("#2 Promise.resolve()");
});

// Next Tick
process.nextTick(() => {
  console.log("#1 process.nextTick()");
});
