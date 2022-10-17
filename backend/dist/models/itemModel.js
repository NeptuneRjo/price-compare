"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const itemModel = new mongoose_1.Schema({
    name: { type: String, required: true },
    prices: {
        LA: {
            price: { type: String, required: true },
            ref: { type: String, required: true },
        },
        TSM: {
            price: { type: String, required: true },
            ref: { type: String, required: true },
        },
        SF: {
            price: { type: String, required: true },
            ref: { type: String, required: true },
        },
    },
});
const Item = (0, mongoose_1.model)('Item', itemModel);
exports.default = Item;
