"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeTsmCats = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
const scrapeTsmCats = async () => {
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    await page.goto(`https://tsmaquatics.com`);
    await page.setViewport({
        height: 5000,
        width: 1920,
    });
    await page.hover('li.tmenu_item--root:nth-child(4)');
    const catNames = await page.$$eval('html.js.wf-poppins-n4-active.wf-active.wf-bitter-n4-active.wf-roboto-n4-active.wf-lato-n4-active body.template-collection div.main-page div.wrapper-nav.hidden-lg-down div.navfullwidth div.page-width div#shopify-section-Ishi_headerlink.shopify-section div.headerlink-section.hidden-lg-down div#_desktop_link_menu div#ishiheaderlinks_block.header-block div#header_ishiheaderlinks div.tmenu_wrapper.tmenu--fullwidth.tmenu--wrap nav.tmenu_navbar.tmenu_app.tmenu_initialized.tmenu_transition_fade.tmenu_alignment_center.tmenu_skin_undefined.tmenu_app--horizontal ul.tmenu_nav li.tmenu_item.tmenu_item--root.tmenu_item_level_0.tmenu_item_submenu_type_mega.tmenu_item_submenu_mega_position_fullwidth.tmenu_item_has_child.tmenu_item--current ul.tmenu_submenu.tmenu_submenu_type_mega.tmenu_submenu--desktop.tmenu_submenu_mega_position_fullwidth.tmenu_submenu_has_watermark li.tmenu_item.tmenu_item_level_1.tmenu_col.tmenu_col-2.tmenu_item_submenu_type_automatic.tmenu_item_layout.tmenu_item_layout_collection a.tmenu_item_link div.tmenu_collection.tmenu_collection--left div.tmenu_item_text', async (names) => {
        return names.map((index) => index.innerText);
    });
    console.log(catNames);
    const catLinks = await page.$$eval('html.js.wf-poppins-n4-active.wf-active.wf-bitter-n4-active.wf-roboto-n4-active.wf-lato-n4-active body.template-collection div.main-page div.wrapper-nav.hidden-lg-down div.navfullwidth div.page-width div#shopify-section-Ishi_headerlink.shopify-section div.headerlink-section.hidden-lg-down div#_desktop_link_menu div#ishiheaderlinks_block.header-block div#header_ishiheaderlinks div.tmenu_wrapper.tmenu--fullwidth.tmenu--wrap nav.tmenu_navbar.tmenu_app.tmenu_initialized.tmenu_transition_fade.tmenu_alignment_center.tmenu_skin_undefined.tmenu_app--horizontal ul.tmenu_nav li.tmenu_item.tmenu_item--root.tmenu_item_level_0.tmenu_item_submenu_type_mega.tmenu_item_submenu_mega_position_fullwidth.tmenu_item_has_child.tmenu_item--current ul.tmenu_submenu.tmenu_submenu_type_mega.tmenu_submenu--desktop.tmenu_submenu_mega_position_fullwidth.tmenu_submenu_has_watermark li.tmenu_item.tmenu_item_level_1.tmenu_col.tmenu_col-2.tmenu_item_submenu_type_automatic.tmenu_item_layout.tmenu_item_layout_collection a.tmenu_item_link', (names) => {
        const href = names.map((index) => index.getAttribute('href'));
        return href;
    });
    for (let i = 0; i < catNames.length; i++) {
        const links = catLinks[i];
        await categoryModel_1.default.findOneAndUpdate({ name: catNames[i] }, {
            $push: {
                links: {
                    TSM: `https://tsmaquatics.com${links}`,
                },
            },
        }, { setDefaultsOnInsert: true, upsert: true });
    }
};
exports.scrapeTsmCats = scrapeTsmCats;
