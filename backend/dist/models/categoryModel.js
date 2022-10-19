"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categoryModel = new mongoose_1.Schema({
    name: { type: String, required: true },
    links: { type: Array, required: true },
});
const Category = (0, mongoose_1.model)('Category', categoryModel);
exports.default = Category;
