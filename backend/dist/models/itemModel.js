"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const itemModel = new mongoose_1.Schema({
    name: { type: String },
    prices: {
        LA: {
            price: { type: String },
            ref: { type: String },
        },
        TSM: {
            price: { type: String },
            ref: { type: String },
        },
        SF: {
            price: { type: String },
            ref: { type: String },
        },
    },
});
const Item = (0, mongoose_1.model)('Item', itemModel);
exports.default = Item;
