"use strict";
(() => {
var exports = {};
exports.id = 475;
exports.ids = [475];
exports.modules = {

/***/ 6090:
/***/ ((module) => {

module.exports = import("stripe");;

/***/ }),

/***/ 1514:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6090);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([stripe__WEBPACK_IMPORTED_MODULE_0__]);
stripe__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const stripe = new stripe__WEBPACK_IMPORTED_MODULE_0__["default"](process.env.STRIPE_SECRET_KEY);
async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const params = {
                submit_type: "pay",
                mode: "payment",
                payment_method_types: [
                    "card"
                ],
                billing_address_collection: "auto",
                shipping_options: [
                    {
                        shipping_rate: "shr_1N6FCNIUnj6UO6I6Z5Dj3OEZ"
                    },
                    {
                        shipping_rate: "shr_1N6FBhIUnj6UO6I6HaCMssaL"
                    }
                ],
                line_items: req.body.map((item)=>{
                    const img = item.image[0].asset._ref;
                    const newImage = img.replace("image-", "https://cdn.sanity.io/images/vfxfwnaw/production/").replace("-webp", ".webp");
                    return {
                        price_data: {
                            currency: "eur",
                            product_data: {
                                name: item.name,
                                images: [
                                    newImage
                                ]
                            },
                            unit_amount: item.price * 100
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1
                        },
                        quantity: item.quantity
                    };
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/canceled`
            };
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);
            res.status(200).json(session);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(1514));
module.exports = __webpack_exports__;

})();