'use strict';

module.exports = ({ strapi }) => ({
  async list(ctx) {
    try {
      return await strapi.plugin("frame").service("product").list(ctx.query);
    } catch (err) {
      ctx.throw(500, 'Internal Server Error from main controler');
    }
  },
  async create(ctx) {
    try {
      const data = ctx.request.body;
      const createdProduct = await strapi.plugin("frame").service("product").create(data);
      return createdProduct;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async find(ctx) {
    try {
      const { id } = ctx.params;

      if (!id) {
        ctx.throw(400, 'ID is required to find a product');
      }

      return await strapi.plugin("frame").service("product").find(id);
    } catch (err) {
      ctx.throw(500, err.message || 'Internal Server Error');
    }
  },
  async update(ctx) {
    const { id } = ctx.params;
    const updateData = ctx.request.body;

    try {
      await strapi.plugin("frame").service("product").update(id, updateData);

    } catch (err) {
      console.error('Update failed:', err);
      ctx.throw(500, err.message || 'Internal Server Error');
    }

    return {
      message: 'Updated successfully'
    }
  },
  async findFeatured(ctx) {
    try {
      const featuredProducts = await strapi.entityService.findMany('plugin::frame.product', {
        filters: { featured: true },
        populate: '*'
      });

      ctx.body = featuredProducts;
    } catch (err) {
      ctx.throw(500, 'Unable to fetch featured products');
    }
  },
  async deleteFrame(ctx) {
    const { id } = ctx.params;

    try {
      await strapi.service('plugin::frame.product').deleteFrame(id);
      ctx.send({
        message: 'Frame deleted successfully',
      });
    } catch (error) {
      ctx.send({
        message: 'Failed to delete frame',
        error: error.message,
      }, 500);
    }
  },
});
