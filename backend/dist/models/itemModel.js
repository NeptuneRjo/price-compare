"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const itemModel = new mongoose_1.Schema({
    name: { type: String },
    prices: {
        LA: {
            price: { type: String, default: '' },
            ref: { type: String, default: '' },
        },
        TSM: {
            price: { type: String, default: '' },
            ref: { type: String, default: '' },
        },
        SF: {
            price: { type: String, default: '' },
            ref: { type: String, default: '' },
        },
    },
});
const Item = (0, mongoose_1.model)('Item', itemModel);
exports.default = Item;
