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
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    await page.goto(`${url}?rp=200`);
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
    const itemsArray = [];
    for (let i = 0; i < itemNames.length; i++) {
        const item = {
            name: itemNames[i],
            prices: {
                LA: {
                    price: itemPrices[i],
                    ref: itemLinks[i],
                },
            },
        };
        await models_1.Item.findOneAndUpdate({ name: item.name }, {
            $push: {
                prices: {
                    SF: {
                        price: itemPrices[i],
                        ref: `https://www.saltwaterfish.com${itemLinks[i]}`,
                    },
                },
            },
        }, {
            setDefaultsOnInsert: true,
            upsert: true,
        });
        const itemObj = await models_1.Item.findOne({ name: item.name });
        itemsArray.push(itemObj);
    }
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
