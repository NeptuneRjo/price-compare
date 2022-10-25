"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./routes");
const scraperUtils_1 = require("./scrapers/scraperUtils");
const node_cron_1 = __importDefault(require("node-cron"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
/* Middleware */
app.use((0, cors_1.default)({
    credentials: true,
    origin: [
        'http://localhost:3000',
        'https://neptunerjo.github.io/price-compare/',
    ],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
/* Routes */
app.use('/api', routes_1.itemRoutes);
/* Util */
process.setMaxListeners(0);
// Updates the item lists every wednesday at 12:00
node_cron_1.default.schedule('0 12 * * 3', async () => {
    await (0, scraperUtils_1.scrapeItems)();
});
/*
    Run these functions to populate the db with Categories and Items

    IN THIS ORDER:
    1. scrapeLaCats()
    2. scrapeSfCats()
    3. scrapeItems()

*/
// scrapeLaCats()
// scrapeSfCats()
// scrapeItems()
/* Server */
mongoose_1.default.connect(process.env.MONGO_URI).then(() => {
    app.listen(port, () => {
        console.log('Connected to database and listening on port', port);
    });
});
