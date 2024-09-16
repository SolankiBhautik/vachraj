module.exports = [
  {
    method: 'GET',
    path: '/product/find/:id',
    handler: 'main.find',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'GET',
    path: '/products/featured',
    handler: 'main.findFeatured',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'PUT',
    path: '/product/update/:id',
    handler: 'main.update',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'GET',
    path: '/product/',
    handler: 'main.list',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'POST',
    path: '/product/create',
    handler: 'main.create',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'DELETE',
    path: '/product/delete/:id',
    handler: 'main.deleteFrame',
    config: {
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'GET',
    path: '/category/list',
    handler: 'category.list',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'GET',
    path: '/size/list',
    handler: 'size.list',
    config: {
      policies: [],
      auth: false
    },
  },
];
