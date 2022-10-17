"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
require("./config/mongoServer");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
/* Middleware */
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
/* Routes */
app.use('/api/categories', routes_1.categoryRoutes);
/* Server */
mongoose_1.connection.on('connected', () => {
    app.listen(port, () => {
        console.log('Connected to database and listening on port', port);
    });
});
