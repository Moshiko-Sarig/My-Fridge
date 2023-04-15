"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./src/routes/user.routes"));
const item_routes_1 = __importDefault(require("./src/routes/item.routes"));
const itemCategory_routes_1 = __importDefault(require("./src/routes/itemCategory.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1", [user_routes_1.default, item_routes_1.default, itemCategory_routes_1.default]);
app.use("*", (req, res) => {
    res.status(404).send(`Route not found ${req.originalUrl}`);
});
const server = app.listen(process.env.APP_PORT, () => {
    console.log("Server is listening on port:", process.env.APP_PORT);
}).on("error", (err) => {
    console.log(err);
    if (err.code === "EADDRINUSE") {
        console.log("Error: Address in use");
    }
    else {
        console.log("Error: Unknown error");
    }
});
exports.default = server;
