const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const port = process.env.port;
const publicDirectory = path.join(__dirname, "/public");
const messageRouter = require("./src/routes/messageRoute")
require("./src/db/mongoose")
app.use(cors());
app.use(express.json());
app.use(express.static(publicDirectory))
app.use(messageRouter)

app.listen(port, ()=>{
    console.log("Server connected, port: ", port);
})