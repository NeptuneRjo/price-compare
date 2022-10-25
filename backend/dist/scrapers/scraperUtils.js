"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeItems = void 0;
const laScraper_1 = require("./laScraper");
const sfScraper_1 = require("./sfScraper");
const models_1 = require("../models");
const scrapeItems = async () => {
    const laCat = await models_1.Category.findOne({ name: 'LiveAquaria' });
    const laCatLinks = laCat === null || laCat === void 0 ? void 0 : laCat.links;
    const sfCat = await models_1.Category.findOne({ name: 'SaltwaterFish' });
    const sfCatLinks = sfCat === null || sfCat === void 0 ? void 0 : sfCat.links;
    for (let link of laCatLinks) {
        await (0, laScraper_1.scrapeLaItems)(link);
    }
    for (let link of sfCatLinks) {
        await (0, sfScraper_1.scrapeSfItems)(link);
    }
    // setInterval(async () => {
    // 	if (i < sfCatLinks.length) {
    // 		await scrapeSfItems(sfCatLinks[i])
    // 		i++
    // 	} else {
    // 		clearInterval()
    // 	}
    // }, 20000)
};
exports.scrapeItems = scrapeItems;
