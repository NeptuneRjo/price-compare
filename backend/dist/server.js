"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./routes");
require("./config/mongoServer");
const config_1 = __importDefault(require("./config"));
const laScraper_1 = require("./scrapers/laScraper");
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
/* Middleware */
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
(0, laScraper_1.scrapeLaCats)();
/* Routes */
app.use('/api/categories', routes_1.categoryRoutes);
/* Server */
mongoose_1.default.connect(config_1.default.mongo.uri).then(() => {
    app.listen(port, () => {
        console.log('Connected to database and listening on port', port);
    });
});
