'use strict';

module.exports = ({ strapi }) => ({
  async list(ctx) {
    try {
        return await strapi.plugin("frame").service("size").list(ctx.query);
    } catch (err){
        ctx.throw(500, err)        
    }
  },
});
