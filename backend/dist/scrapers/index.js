"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const laScraper_1 = require("./laScraper");
const sfScraper_1 = require("./sfScraper");
const models_1 = require("../models");
const node_cron_1 = __importDefault(require("node-cron"));
node_cron_1.default.schedule('0 12 * * 3', async () => {
    const laCat = await models_1.Category.findOne({ name: 'LiveAquaria' });
    for (let link of laCat === null || laCat === void 0 ? void 0 : laCat.links) {
        (0, laScraper_1.scrapeLaItems)(link);
    }
    const sfCat = await models_1.Category.findOne({ name: 'SaltwaterFish' });
    for (let link of laCat === null || laCat === void 0 ? void 0 : laCat.links) {
        (0, sfScraper_1.scrapeSfItems)(link);
    }
});
(async () => {
    const laCat = await models_1.Category.findOne({ name: 'LiveAquaria' });
    for (let link of laCat === null || laCat === void 0 ? void 0 : laCat.links) {
        (0, laScraper_1.scrapeLaItems)(link);
    }
    const sfCat = await models_1.Category.findOne({ name: 'SaltwaterFish' });
    for (let link of laCat === null || laCat === void 0 ? void 0 : laCat.links) {
        (0, sfScraper_1.scrapeSfItems)(link);
    }
})();
