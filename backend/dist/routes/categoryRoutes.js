"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
// /api/categories
router.route('/category/:id').get(controllers_1.get_category);
router.route('/').get(controllers_1.get_all_categories);
exports.default = router;
