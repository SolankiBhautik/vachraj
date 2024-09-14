'use strict';

const { Content } = require('@strapi/design-system/Popover/Popover.js');

/**
 * home-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::home-page.home-page')
