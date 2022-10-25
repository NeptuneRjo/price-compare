"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_items = void 0;
const models_1 = require("../models");
const get_items = async (req, res) => {
    const items = await models_1.Item.find({});
    res.status(200).json({ data: items });
};
exports.get_items = get_items;
