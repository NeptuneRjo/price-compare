"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const mongoMemoryServer_1 = require("../config/mongoMemoryServer");
require("jest");
const fixtures_1 = require("../fixtures");
describe('Category Model', () => {
    beforeAll(async () => {
        await (0, mongoMemoryServer_1.initializeMongoServer)();
    });
    afterAll(async () => {
        await (0, mongoMemoryServer_1.deinitializeMongoServer)();
    });
    afterEach(async () => {
        await (0, mongoMemoryServer_1.dropCollections)();
    });
    it('creates a new category', async () => {
        const newCategory = await models_1.Category.create(fixtures_1.fakeCategoryPass);
        const { _id, name, links } = newCategory;
        expect(_id).toBeDefined();
        expect(name).toEqual(fixtures_1.fakeCategoryPass.name);
        expect(links === null || links === void 0 ? void 0 : links.LA).toEqual(fixtures_1.fakeCategoryPass.links.LA);
        expect(links === null || links === void 0 ? void 0 : links.TSM).toEqual(fixtures_1.fakeCategoryPass.links.TSM);
        expect(links === null || links === void 0 ? void 0 : links.SF).toEqual(fixtures_1.fakeCategoryPass.links.SF);
        expect(links === null || links === void 0 ? void 0 : links.SF).not.toEqual(fixtures_1.fakeCategoryPass.links.LA);
    });
    it('fails to create a new category with no content provided', async () => {
        try {
            const newCategory = new models_1.Category();
            await newCategory.validate();
        }
        catch (error) {
            expect(error).not.toBeNull();
        }
    });
    it('fails to create a new category with incorrect fields', async () => {
        try {
            const newCategory = new models_1.Category(fixtures_1.fakeCategoryFail);
            await newCategory.validate();
        }
        catch (error) {
            expect(error).not.toBeNull();
        }
    });
    it('creates a new category with the static', async () => {
        const { name, links } = fixtures_1.fakeCategoryPass;
        const newCat = await models_1.Category.addNewCat(name, links.LA, links.TSM, links.SF);
        expect(newCat.name).toEqual(name);
        expect(newCat.links.LA).toEqual(links.LA);
        expect(newCat.links.TSM).toEqual(links.TSM);
        expect(newCat.links.SF).toEqual(links.SF);
        expect(newCat.links.LA).not.toEqual(links.TSM);
    });
});
