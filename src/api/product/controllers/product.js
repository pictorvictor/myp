"use strict";

const category = require("../../category/controllers/category");

/**
 *  product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", {
  async find(ctx) {
    const entries = await strapi.entityService.findMany(
      "api::product.product",
      {
        populate: {
          photo: true,
          category: true,
        },
      }
    );
    const sanitizedEntity = await this.sanitizeOutput(entries, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  async findOne(ctx) {
    const { id } = ctx.request.params;
    const entry = await strapi.entityService.findOne(
      "api::product.product",
      id,
      {
        populate: { photo: true },
      }
    );
    const sanitizedEntity = await this.sanitizeOutput(entry, ctx);
    return this.transformResponse(sanitizedEntity);
  },
  async create(ctx, next) {
    // get user from context
    let user = ctx.req.dataFromGetUserMiddleware;
    // get request body data from context
    let { title, price, description, _category } = ctx.request.body.data;
    let categories = await strapi.entityService.findMany(
      "api::category.category"
    );
    // get category that the user wants to select for the product using the category slug
    let category = categories.find((el) => el.name == _category);

    // use the create method from Strapi enitityService
    const product = await strapi.entityService.create("api::product.product", {
      data: {
        title,
        price,
        description,
        // pass in the category id and  user id to define category and owner
        category: category.id,
        user: user.id,
      },
    });
    return { product };
  },
});
