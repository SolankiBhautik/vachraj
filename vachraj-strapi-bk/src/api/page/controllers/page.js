'use strict';

/**
 * page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::page.page', ({ strapi }) => ({
    async find(ctx) {
        try {
            const query = {
                ...ctx.query,
                populate: {
                    Content: {
                        populate: '*'
                    }
                }
            };

            const data = await strapi.entityService.findMany('api::page.page', query);

            return data;
        } catch (error) {
            ctx.throw(500, 'An error occurred while fetching the data', { details: error.message });
        }
    },
}));
