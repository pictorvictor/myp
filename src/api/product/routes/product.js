"use strict";

/**
 * product router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

//custom getUser middleware
const getUser = require("../../../middlewares/get-user-middleware");

module.exports = createCoreRouter("api::product.product", {
  config: {
    find: {
      middlewares: [getUser],
    },
    findOne: {
      middlewares: [getUser],
    },
    create: {
      middlewares: [getUser],
    },
    update: {
      middlewares: [getUser],
    },
    delete: {
      middlewares: [getUser],
    },
  },
});
