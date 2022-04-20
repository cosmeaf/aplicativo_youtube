const express = require("express");
const dotenv = require("dotenv");
const mustache = require("mustache-express");
const cors = require("cors");
const path = require("path");

dotenv.config();

const apiRouter = require("../src/routes");

const server = express();

server.set("view engine", "mustache");
server.set("views", path.join(__dirname, "views"));
server.engine("mustache", mustache());

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "../public")));

server.use("/api", apiRouter);

server.use((req, res) => {
  res.send("Pagina nao encontrada");
});

let PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`- Server Running on: http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  server.close();
  console.log("Server Finalizado");
});
