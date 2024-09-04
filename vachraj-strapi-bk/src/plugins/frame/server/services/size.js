'use strict';

module.exports = ({ strapi }) => ({
  async list(query) {
    return await strapi.entityService.findMany("plugin::frame.size", query);
  },
});
