// src/pages/EditFramePage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ContentLayout, HeaderLayout, Button, Layout, BaseHeaderLayout } from '@strapi/design-system';
import ProductFormField from '../../components/ProductFormField';
import axios from 'axios';

const EditFramePage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/frame/product/find/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error('Failed to fetch product', err);
        setError('Failed to fetch product. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleEdit = async (data) => {
    try {
      await axios.put(`/frame/product/update/${id}`, data);
      window.history.back()
    } catch (error) {
      console.error('Failed to update product', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Layout sideNav={null}>
      <BaseHeaderLayout
        title="Edit Product"
        primaryAction={
          <Button onClick={() => window.history.back()} variant="secondary">
            Back
          </Button>
        }
      />
      {product && <ProductFormField values={product} onSubmit={handleEdit} />}
    </Layout>
  );
};

export default EditFramePage;
