"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const mongoMemoryServer_1 = require("../config/mongoMemoryServer");
require("jest");
const fixtures_1 = require("../fixtures");
describe('Item Model', () => {
    beforeAll(async () => {
        await (0, mongoMemoryServer_1.initializeMongoServer)();
    });
    afterAll(async () => {
        await (0, mongoMemoryServer_1.deinitializeMongoServer)();
    });
    afterEach(async () => {
        await (0, mongoMemoryServer_1.dropCollections)();
    });
    it('creates a new Item', async () => {
        const newItem = await models_1.Item.create(fixtures_1.fakeItemPass);
        const { _id, name, prices } = newItem;
        expect(_id).toBeDefined();
        expect(name).toEqual(fixtures_1.fakeItemPass.name);
        expect(prices === null || prices === void 0 ? void 0 : prices.LA).toEqual(fixtures_1.fakeItemPass.prices.LA);
        expect(prices === null || prices === void 0 ? void 0 : prices.SF).toEqual(fixtures_1.fakeItemPass.prices.SF);
        expect(prices === null || prices === void 0 ? void 0 : prices.SF).not.toEqual(fixtures_1.fakeItemPass.prices.LA);
    });
    it('fails to create a new Item with no content provided', async () => {
        try {
            const newItem = new models_1.Item();
            await newItem.validate();
        }
        catch (error) {
            expect(error).not.toBeNull();
        }
    });
    it('fails to create a new Item with incorrect fields', async () => {
        try {
            const newItem = new models_1.Item(fixtures_1.fakeItemFail);
            await newItem.validate();
        }
        catch (error) {
            expect(error).not.toBeNull();
        }
    });
});
