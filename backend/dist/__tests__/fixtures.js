"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeItemFail = exports.fakeItemPass = exports.fakeCategoryFail = exports.fakeCategoryPass = void 0;
exports.fakeCategoryPass = {
    name: 'Fish',
    links: {
        LA: 'https://google.com',
        TSM: 'https://example.com',
        SF: 'https://mozilla.com',
    },
};
exports.fakeCategoryFail = {
    name: 1,
    links: {
        LA: 'https://google.com',
        TSM: 'https://google.com',
    },
};
exports.fakeItemPass = {
    name: 'Fish',
    prices: {
        LA: {
            price: '$1',
            ref: 'https://google.com',
        },
        TSM: {
            price: '$1',
            ref: 'https://example.com',
        },
        SF: {
            price: '$1',
            ref: 'https://mozilla.com',
        },
    },
};
exports.fakeItemFail = {
    name: 1,
    prices: {
        LA: {
            price: 1,
            ref: 'https://google.com',
        },
        TSM: {
            price: '$1',
            ref: 'https://example.com',
        },
        SF: {
            price: '$1',
            ref: 'https://mozilla.com',
        },
    },
};
