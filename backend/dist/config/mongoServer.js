"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../config"));
(0, mongoose_1.connect)(config_1.default.mongo.uri);
mongoose_1.connection.on('error', console.error.bind(console, 'Mongo connection error'));
