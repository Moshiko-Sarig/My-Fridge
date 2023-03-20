const express = require("express");
const cors = require("cors");
const server = express();
const dotenv = require('dotenv');
dotenv.config();
const userRoutes = require('./src/routes/User');

server.use(cors());
server.use(express.json());

server.use('/api/v1', userRoutes);

server.use("*", (req, res) => {
    res.status(404).send(`Route not found ${req.originalUrl}`);
});


server.listen(process.env.APP_PORT, () => {
    console.log("Server is listening on port:", process.env.APP_PORT);
}).on("error", (err) => {
    console.log(err);
    if (err.code === "EADDRINUSE") {
        console.log("Error: Address in use");
    } else {
        console.log("Error: Unknown error");
    }
});
