"use strict";

/**
 *  order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async find(ctx) {
    const entries = await strapi.entityService.findMany("api::order.order", {
      populate: "products",
    });
    const sanitizedEntity = await this.sanitizeOutput(entries, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  async findOne(ctx) {
    const { id } = ctx.request.params;
    const entry = await strapi.entityService.findOne("api::order.order", id, {
      populate: { products: true },
    });
    const sanitizedEntity = await this.sanitizeOutput(entry, ctx);
    console.log(ctx.state.user);
    return this.transformResponse(sanitizedEntity);
  },

  async create(ctx, next) {
    // get user from context
    console.log(ctx.state);
    const user = ctx.state.user;
    // get request body data from context
    const { products } = ctx.request.body.data;
    console.log(products);
    // use the create method from Strapi enitityService
    const order = await strapi.entityService.create("api::order.order", {
      data: {
        products,
        // pass in the owner id to define the owner
        user: user.id,
      },
    });
    return { order };
  },
}));
