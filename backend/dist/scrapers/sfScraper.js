"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeSfCats = exports.scrapeSfItems = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const models_1 = require("../models");
const scrapeSfItems = async (url) => {
    var _a;
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    await page.goto(`${url}?rp=200`);
    await page.setViewport({
        height: 5000,
        width: 1920,
    });
    const itemNames = await page.$$eval('h3.listing-item-title a.text-white', (names) => {
        const innerText = names.map((index) => index.innerText);
        let cleansedArray = [];
        for (let text of innerText) {
            const removeApost = text.replace(/[']/g, '');
            const removeDash = removeApost.replace('-', ' ');
            const removeColon = removeDash.split(':');
            const removeDouble = removeColon[0].split(/  +/g);
            cleansedArray.push(removeDouble[0]);
        }
        return cleansedArray;
    });
    const itemPrices = await page.$$eval('h5.listing-item-price a', (prices) => {
        const innerText = prices.map((index) => index.innerText);
        let splitArray = [];
        for (let text of innerText) {
            const removeText = text.replace('Sale: ', '');
            const splitText = removeText.split(' ');
            splitArray.push(splitText[2]);
        }
        return splitArray;
    });
    const itemLinks = await page.$$eval('h3.listing-item-title a.text-white', (links) => {
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
                        price: itemPrices[i],
                        ref: `https://www.saltwaterfish.com${itemLinks[i]}`,
                    },
                    LA: {
                        price: ' ',
                        ref: ' ',
                    },
                },
            });
        }
        else {
            await models_1.Item.findOneAndUpdate({ name: itemNames[i] }, {
                prices: {
                    LA: (_a = item === null || item === void 0 ? void 0 : item.prices) === null || _a === void 0 ? void 0 : _a.LA,
                    SF: {
                        price: itemPrices[i],
                        ref: `https://www.saltwaterfish.com${itemLinks[i]}`,
                    },
                },
            }, {
                upsert: true,
            });
        }
    }
    return;
};
exports.scrapeSfItems = scrapeSfItems;
const scrapeSfCats = async () => {
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.saltwaterfish.com/categorylist-saltwater-fish`);
    await page.setViewport({
        height: 5000,
        width: 1920,
    });
    const catLinks = await page.$$eval('html body div#canvas main.listing-page.category-listing-page section.py-5 div.container div.row div.col-6.col-sm-4.col-md-3 div.card.mb-3.border-0.listing-item div.card-body.p-0 a', (names) => {
        const href = names.map((index) => index.getAttribute('href'));
        return href;
    });
    for (let i = 0; i < catLinks.length; i++) {
        await categoryModel_1.default.findOneAndUpdate({ name: 'SaltwaterFish' }, {
            $push: {
                links: `https://www.saltwaterfish.com${catLinks[i]}`,
            },
        }, { setDefaultsOnInsert: true, upsert: true });
    }
};
exports.scrapeSfCats = scrapeSfCats;
