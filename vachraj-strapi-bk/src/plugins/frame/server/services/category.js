'use strict';

module.exports = ({ strapi }) => ({
  async list(query) {
    return await strapi.entityService.findMany("plugin::frame.category", query);
  },
});
