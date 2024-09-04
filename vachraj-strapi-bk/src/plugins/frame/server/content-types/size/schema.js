'use strict';

module.exports = {
  "kind": "collectionType",
  "collectionName": "size",
  "info": {
    "singularName": "size",
    "pluralName": "sizes",
    "displayName": "Size",
    "description": "This is the size content type"
  },
  "options": {
    "draftAndPublish": true,
  },
  "attributes": {
    "name": {
      "type": "string",
      "unique": true
    },
    "dimensions": {
      "type": "string",
      "required": true
    }
  }
}