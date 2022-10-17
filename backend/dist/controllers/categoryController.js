"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_all_categories = exports.get_category = void 0;
const models_1 = require("../models");
const get_category = async (req, res) => {
    const name = req.params;
    const category = await models_1.Category.findOne({ name });
    if (!category) {
        return res.status(404).json({ error: 'No category found with that name' });
    }
    res.status(200).json({ data: category });
};
exports.get_category = get_category;
const get_all_categories = async (req, res) => {
    const categories = await models_1.Category.find({});
    if (!categories) {
        return res.status(204).json({ data: categories });
    }
    res.status(200).json({ data: categories });
};
exports.get_all_categories = get_all_categories;
