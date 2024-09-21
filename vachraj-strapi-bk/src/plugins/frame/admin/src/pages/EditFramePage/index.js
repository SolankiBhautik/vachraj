import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
      window.history.back();
    } catch (error) {
      console.error('Failed to update product', error);
      setError('Failed to update product. Please try again.');
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Main aria-busy={loading}>
      <HeaderLayout
        primaryAction={
          <></>
        }
        title="Edit Product"
        navigationAction={
          <StrapiLink startIcon={<ArrowLeft />} to="/plugins/frame/">
            Back
          </StrapiLink>
        }
      />
      {product && (
        <ProductFormField
          values={product}
          onSubmit={handleEdit}
        />
      )}
    </Main>
  );
};

export default EditFramePage;