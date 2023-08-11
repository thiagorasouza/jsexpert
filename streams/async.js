import { pipeline } from "node:stream/promises";

async function * readable() {
    yield "First chunk";
    yield "Second chunk";
    yield "Third chunk";
}

async function * transform(source) {
    for await (const chunk of source) {
        yield `${chunk} - transformed`;
    }
}

async function writable(source) {
    for await (const chunk of source) {
        console.log("msg", chunk);
    }
}

// writable(readable());

await pipeline(
    readable,
    transform,
    writable
);