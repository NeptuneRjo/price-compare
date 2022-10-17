"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categoryModel = new mongoose_1.Schema({
    name: { type: String, required: true },
    links: {
        LA: { type: String, required: true },
        TSM: { type: String, required: true },
        SF: { type: String, required: true },
    },
    items: { type: Array, required: true },
});
// Exists as a util function if ever needed
categoryModel.statics.addNewCat = async function (name, LA, TSM, SF) {
    const exists = await this.findOne({ name });
    if (exists)
        throw Error('A category already exists with this name.');
    const newCat = await this.create({
        name,
        links: {
            LA,
            TSM,
            SF,
        },
        items: [],
    });
    return newCat;
};
const Category = (0, mongoose_1.model)('Categorie', categoryModel);
exports.default = Category;
