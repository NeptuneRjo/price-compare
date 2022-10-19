"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeLaCats = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
const scrapeLaCats = async () => {
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.liveaquaria.com/category/15/marine-fish`);
    await page.setViewport({
        height: 5000,
        width: 1920,
    });
    const catNames = await page.$$eval('div.category-list div.category-item a.cat-name.categorypage-ev-tracking', async (names) => {
        return names.map((index) => index.innerText);
    });
    const catLinks = await page.$$eval('div.category-list div.category-item a.cat-name.categorypage-ev-tracking', (names) => {
        const href = names.map((index) => index.getAttribute('href'));
        return href;
    });
    for (let i = 0; i < catNames.length; i++) {
        const links = catLinks[i];
        if (i > 4) {
            await categoryModel_1.default.findOneAndUpdate({ name: { $regex: catNames[i] } }, {
                $push: {
                    links: {
                        LA: `https://www.liveaquaria.com/category/15/marine-fish${links}`,
                    },
                },
            }, { setDefaultsOnInsert: true, upsert: true });
        }
    }
};
exports.scrapeLaCats = scrapeLaCats;
