"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categoryModel = new mongoose_1.Schema({
    name: { type: String },
    links: {
        LA: { type: String },
        TSM: { type: String },
        SF: { type: String },
    },
});
// Exists as a util function if ever needed
categoryModel.statics.addNewCat = async function (name, LAurl, TSMurl, SFurl) {
    const exists = await this.findOne({ name });
    if (exists)
        throw Error('A category already exists with this name.');
    const newCat = await this.create({
        name,
        links: {
            LA: LAurl,
            TSM: TSMurl,
            SF: SFurl,
        },
    });
};
const Category = (0, mongoose_1.model)('Categorie', categoryModel);
exports.default = Category;
