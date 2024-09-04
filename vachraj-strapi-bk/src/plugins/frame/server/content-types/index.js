'use strict';

const product = require('./product/schema');
const category = require('./category/schema');
const size = require('./size/schema');

module.exports = {
    'product': { schema: product }, 
    'category': { schema: category }, 
    'size': { schema: size }, 
  };