"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const item_controller_1 = __importDefault(require("../controllers/item.controller"));
const router = express_1.default.Router();
// TODO: Add middleware to the routes
router.get("/items/:id", item_controller_1.default.getItemsByUserId);
router.post("/items/add/new/item", item_controller_1.default.addItem);
router.put("/items/edit/item", item_controller_1.default.editItem);
router.delete("/items/delete/:item_id", item_controller_1.default.deleteItem);
exports.default = router;
