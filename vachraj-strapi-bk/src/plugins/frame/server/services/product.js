'use strict';

module.exports = ({ strapi }) => ({
  async find(id) {

    if (!id) {
      throw new Error('ID is required to find a product');
    }
    return await strapi.db.query('plugin::frame.product').findOne({
      where: { id },
      populate: {
        category: true,
        sizes: true,
        images: true,
        customization_preview_image: true,
      },
    });
  },
  async list(query) {
    return await strapi.entityService.findMany("plugin::frame.product", {
      ...query,
      populate: '*',
    });
  },
  async create(data) {
    try {
      const createdProduct = await strapi.entityService.create("plugin::frame.product", {
        data: data,
      });

      return createdProduct;
    } catch (err) {
      throw new Error('Failed to create product: ' + err.message);
    }
  },
  async update(id, updateData) {
    if (!id) {
      throw new Error('ID is required to update a product');
    }

    const updatedProduct = await strapi.db.query('plugin::frame.product').update({
      where: { id },
      data: updateData,
      populate: '*',
    });

    if (!updatedProduct) {
      throw new Error('Product not found');
    }

    return updatedProduct;
  },
});
