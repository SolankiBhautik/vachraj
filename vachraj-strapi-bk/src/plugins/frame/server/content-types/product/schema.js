'use strict';

module.exports = {
  "kind": "collectionType",
  "collectionName": "product",
  "info": {
    "singularName": "product",
    "pluralName": "products",
    "displayName": "Product",
  },
  "options": {
    "draftAndPublish": false,
  },
  "attributes": {
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "price": {
      "type": "decimal"
    },
    "images": {
      "type": "media",
      "allowedTypes": [
        "images",
        "files",
        "videos"
      ],
      "multiple": true
    },
    "category": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "plugin::frame.category"
    },
    "sizes": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "plugin::frame.size"
    },
    "customization_zone": {
      "type": "dynamiczone",
      "components": [
        "frame-plugin.area"
      ]
    }
  }
}