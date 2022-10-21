"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_items = void 0;
const models_1 = require("../models");
const get_items = async (req, res) => {
    const items = await models_1.Item.find({});
    let returnArray = [];
    const chunkSize = 50;
    if (!items) {
        res.status(204).json({ data: undefined });
    }
    for (let i = 0; i < items.length; i += chunkSize) {
        const chunk = items.slice(i, i + chunkSize);
        returnArray.push(chunk);
    }
    res.status(200).json({ data: returnArray });
};
exports.get_items = get_items;
