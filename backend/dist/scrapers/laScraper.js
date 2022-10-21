"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeLaCats = exports.scrapeLaItems = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const models_1 = require("../models");
const scrapeLaItems = async (url) => {
    var _a;
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    await page.goto(`${url}&start=1&count=200`);
    await page.setViewport({
        height: 5000,
        width: 1920,
    });
    const itemNames = await page.$$eval('div.category-list div.category-item a.cat-name', (names) => {
        const innerText = names.map((index) => index.innerText);
        let cleansedArray = [];
        for (let text of innerText) {
            const removeApost = text.replace(/[']/g, '');
            const removeDash = removeApost.replace(/[-]/g, ' ');
            const cleansedText = removeDash.replace('EXPERT ONLY', '');
            cleansedArray.push(cleansedText);
        }
        return cleansedArray;
    });
    const itemPrices = await page.$$eval('div.category-list div.category-item div.cat-price', (prices) => {
        const innerText = prices.map((index) => index.innerText);
        let splitArray = [];
        for (let text of innerText) {
            const splitText = text.split(' ');
            splitArray.push(splitText[2]);
        }
        return splitArray;
    });
    const itemLinks = await page.$$eval('div.category-list div.category-item a.cat-name', (links) => {
        const href = links.map((index) => index.getAttribute('href'));
        return href;
    });
    for (let i = 0; i < itemNames.length; i++) {
        const item = await models_1.Item.findOne({ name: itemNames[i] });
        if (!item) {
            await models_1.Item.create({
                name: itemNames[i],
                prices: {
                    SF: {
                        price: ' ',
                        ref: ' ',
                    },
                    LA: {
                        price: itemPrices[i],
                        ref: `https://www.liveaquaria.com${itemLinks[i]}`,
                    },
                },
            });
        }
        else {
            await models_1.Item.findOneAndUpdate({ name: itemNames[i] }, {
                prices: {
                    SF: (_a = item === null || item === void 0 ? void 0 : item.prices) === null || _a === void 0 ? void 0 : _a.SF,
                    LA: {
                        price: itemPrices[i],
                        ref: `https://www.liveaquaria.com${itemLinks[i]}`,
                    },
                },
            }, {
                upsert: true,
            });
        }
    }
    return;
};
exports.scrapeLaItems = scrapeLaItems;
const scrapeLaCats = async () => {
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.liveaquaria.com/category/15/marine-fish`);
    await page.setViewport({
        height: 5000,
        width: 1920,
    });
    const catLinks = await page.$$eval('div.category-item a.cat-name.categorypage-ev-tracking', (names) => {
        const href = names.map((index) => index.getAttribute('href'));
        return href;
    });
    for (let i = 0; i < catLinks.length; i++) {
        if (i > 4) {
            await categoryModel_1.default.findOneAndUpdate({ name: 'LiveAquaria' }, {
                $push: {
                    links: `https://www.liveaquaria.com${catLinks[i]}`,
                },
            }, { setDefaultsOnInsert: true, upsert: true });
        }
    }
};
exports.scrapeLaCats = scrapeLaCats;
