"use strict";

/**
 *  category controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const slugify = require("slugify");

module.exports = createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async create(ctx, next) {
      let user = ctx.req.dataFromGetUserMiddleware;
      // get name and products data from context

      const { name, products } = ctx.request.body.data;

      const slug = slugify(name);
      // use the create method from Strapi enitityService
      const category = await strapi.entityService.create(
        "api::category.category",
        {
          data: {
            name,
            slug,
            products,
            // pass in the user id to define the owner
            user: user.id,
          },
        }
      );
      return { category };
    },
    async findBySlug(ctx) {
      const { slug } = ctx.request.params;
      const entry = await strapi.entityService.findMany(
        "api::category.category",
        {
          filters: {
            slug,
          },
          populate: "products",
        }
      );
      const sanitizedEntity = await this.sanitizeOutput(entry, ctx);
      return this.transformResponse(sanitizedEntity);
    },
  })
);
