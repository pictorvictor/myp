"use strict";
const cors = require("@koa/cors");

/**
 * product router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::product.product", {
  config: {
    find: {
      middlewares: [cors()],
    },
  },
});
