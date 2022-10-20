"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./routes");
const config_1 = __importDefault(require("./config"));
const scraperUtils_1 = require("./scrapers/scraperUtils");
const node_cron_1 = __importDefault(require("node-cron"));
require("./config/mongoServer");
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
/* Middleware */
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
/* Routes */
app.use('/api/categories', routes_1.categoryRoutes);
/* Util */
process.setMaxListeners(0);
// Updates the item lists every wednesday at 12:00
node_cron_1.default.schedule('0 12 * * 3', async () => {
    await (0, scraperUtils_1.scrapeItems)();
});
// Run to setup db with items
// scrapeItems()
/* Server */
mongoose_1.default.connect(config_1.default.mongo.uri).then(() => {
    app.listen(port, () => {
        console.log('Connected to database and listening on port', port);
    });
});
