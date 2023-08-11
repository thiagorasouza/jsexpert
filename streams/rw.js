import { Readable, Transform, Writable } from "node:stream";

const readable = new Readable({
    read() {
        this.push("First chunk");
        this.push("Second chunk");
        this.push("Third chunk");
        this.push(null);
    }
});

const transform = new Transform({
    transform(chunk, encoding, cb) {
        const result = `${chunk.toString()} - transformed`;
        cb(null, result);
    }
})

const writable = new Writable({
    write(chunk, encoding, cb) {
        console.log("msg", chunk.toString());
        cb();
    }
})

readable
    .pipe(transform)
    .pipe(writable);