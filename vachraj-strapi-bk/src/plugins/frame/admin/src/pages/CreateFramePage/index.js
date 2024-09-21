import React, { useState } from 'react';
import {
  HeaderLayout,
  Button,
  Main,
} from '@strapi/design-system';
import {
  Link as StrapiLink,
} from '@strapi/helper-plugin';
import { Plus, ArrowLeft } from '@strapi/icons';
import ProductFormField from '../../components/ProductFormField';
import axios from 'axios';

const CreateFramePage = () => {
  const [error, setError] = useState(null);
  const [triggerSubmit, setTriggerSubmit] = useState(false);

  const handleCreate = async (data) => {
    try {
      await axios.post('/frame/product/create', data);
      window.history.back();
    } catch (error) {
      console.error('Failed to create product', error);
      setError('Failed to create product. Please try again.');
    }
  };

  const handleSaveClick = () => {
    setTriggerSubmit(true);
  };

  return (
    <Main>
      <HeaderLayout
        primaryAction={
          <Button
            startIcon={<Plus />}
            onClick={handleSaveClick}
          >
            Save
          </Button>
        }
        title="Create New Product"
        navigationAction={
          <StrapiLink startIcon={<ArrowLeft />} to="/plugins/frame/">
            Back
          </StrapiLink>
        }
      />
      <ProductFormField
        onSubmit={handleCreate}
      />
      {error && <div>{error}</div>}
    </Main>
  );
};

export default CreateFramePage;