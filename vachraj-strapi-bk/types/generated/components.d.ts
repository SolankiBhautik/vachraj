import type { Schema, Attribute } from '@strapi/strapi';

export interface UiElimentsButton extends Schema.Component {
  collectionName: 'components_ui_eliments_buttons';
  info: {
    displayName: 'Button';
    icon: 'stack';
  };
  attributes: {
    Lable: Attribute.String;
    Link: Attribute.String;
    isExternalLink: Attribute.Boolean & Attribute.DefaultTo<false>;
    FullyRounded: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface SectionHero extends Schema.Component {
  collectionName: 'components_section_heroes';
  info: {
    displayName: 'Hero';
    icon: 'picture';
    description: '';
  };
  attributes: {
    Heading: Attribute.String;
    Description: Attribute.RichText;
    Image: Attribute.Media<'images', true>;
    Button: Attribute.Component<'ui-eliments.button'>;
  };
}

export interface FramePluginArea extends Schema.Component {
  collectionName: 'components_frame_plugin_areas';
  info: {
    displayName: 'Area';
    icon: 'expand';
  };
  attributes: {
    Position: Attribute.String;
    Type: Attribute.Enumeration<['Image', 'Text']> &
      Attribute.DefaultTo<'Image'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'ui-eliments.button': UiElimentsButton;
      'section.hero': SectionHero;
      'frame-plugin.area': FramePluginArea;
    }
  }
}
