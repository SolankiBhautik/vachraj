'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('frame')
      .service('myService')
      .getWelcomeMessage();
  },
});
