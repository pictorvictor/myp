"use strict";

/**
 * category router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

//custom getUser middleware
const getUser = require("../../../middlewares/get-user-middleware");

module.exports = createCoreRouter("api::category.category", {
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
