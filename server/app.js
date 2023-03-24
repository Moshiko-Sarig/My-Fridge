const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/user.routes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', userRoutes);

app.use("*", (req, res) => {
    res.status(404).send(`Route not found ${req.originalUrl}`);
});

const server = app.listen(process.env.APP_PORT, () => {
    console.log("Server is listening on port:", process.env.APP_PORT);
}).on("error", (err) => {
    console.log(err);
    if (err.code === "EADDRINUSE") {
        console.log("Error: Address in use");
    } else {
        console.log("Error: Unknown error");
    }
});

module.exports = server; // Export the server instance
