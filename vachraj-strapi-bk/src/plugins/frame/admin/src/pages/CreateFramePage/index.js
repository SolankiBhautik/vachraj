// src/pages/CreateFramePage.js

import React from 'react';
import { ContentLayout, HeaderLayout, Button, Layout, BaseHeaderLayout } from '@strapi/design-system';
import ProductFormField from '../../components/ProductFormField';
import axios from 'axios';

const CreateFramePage = () => {
  const handleCreate = async (data) => {
    try {
      await axios.post('/frame/product/create', data);
      // window.history.back()
    } catch (error) {
      console.error('Failed to create product', error);
    }
  };

  return (
    <Layout sideNav={null}>
      <BaseHeaderLayout
        title="Create New Product"
        primaryAction={
          <Button onClick={() => window.history.back()} variant="secondary">
            Back
          </Button>
        }
      />
      <ProductFormField onSubmit={handleCreate} />
    </Layout>
  );
};

export default CreateFramePage;
