"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_category = exports.get_category = void 0;
const models_1 = require("../models");
const get_category = async (req, res) => {
    const items = await models_1.Item.find({ category: req.params });
    if (!items) {
        return res.status(204).json({ data: items });
    }
    res.status(200).json({ data: items });
};
exports.get_category = get_category;
const create_category = async (req, res) => {
    const newCat = await models_1.Category.create(req.body);
    res.status(200).json({ data: newCat });
};
exports.create_category = create_category;
