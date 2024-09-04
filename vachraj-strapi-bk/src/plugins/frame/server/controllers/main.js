'use strict';

module.exports = ({ strapi }) => ({
  async list(ctx) {
    try {
        return await strapi.plugin("frame").service("product").list(ctx.query);
    } catch (err){
      ctx.throw(500, 'Internal Server Error from main controler');     
    }
  },
  async create(ctx) {
    try {
      // Extract data from the request body
      const data = ctx.request.body;

      // Pass the data to the service's create function
      const createdProduct = await strapi.plugin("frame").service("product").create(data);

      // Return the created product
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
  }  
});
