'use strict';

module.exports = {
  "kind": "collectionType",
  "collectionName": "category",
  "info": {
    "singularName": "category",
    "pluralName": "categorys",
    "displayName": "Category",
    "description": "This is the category content type",
  },
  "options": {
    "draftAndPublish": true,
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "unique": true
    },
    "slug": {
      "type": "uid",
      "targetField": "name",
      "required": true
    },
    "description": {
      "type": "text"
    }
  }
}