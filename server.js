import "./src/polyfills";
import { createServer } from "http";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(5000, "0.0.0.0", (err) => {
    if (err) throw err;
    console.log("Ready on http://0.0.0.0:5000");
  });
});
