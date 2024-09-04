'use strict';

module.exports = ({ strapi }) => ({
  async list(ctx) {
    try {
        return await strapi.plugin("frame").service("category").list(ctx.query);
    } catch (err){
        ctx.throw(500, err)        
    }
  },
});
