// src/components/ProductFormField.js

import React from 'react';
import { Button, TextInput, NumberInput, Textarea, MultiSelect, MultiSelectOption, ContentLayout } from '@strapi/design-system';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomizationArea from './CustomizationArea';

const ProductFormField = ({ values = null, onSubmit }) => {
  const [name, setName] = useState(values?.name || '');
  const [description, setDescription] = useState(values?.description || '');
  const [price, setPrice] = useState(values?.price || '');
  const [images, setImages] = useState(values?.images || []);
  const [previewImage, setPreviewImage] = useState(values?.customization_preview_image || []);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(values?.category || []);
  const [sizes, setSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState(values?.sizes || []);
  const [customizationZone, setCustomizationZone] = useState(values?.customization_zone || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResponse, sizeResponse] = await Promise.all([
          axios.get('/frame/category/list?populate=*'),
          axios.get('/frame/size/list?populate=*')
        ]);
        setCategories(categoryResponse.data);
        setSizes(sizeResponse.data);
      } catch (err) {
        console.error('Failed to fetch categories or sizes', err);
        setError('Failed to fetch data. Please try again.');
      }
    };

    fetchData();
  }, []);

  const handleCustomizationChange = (data) => {
    setCustomizationZone(data.updatedIndicators);
    setPreviewImage(data.image);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    setPrice(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit({
        name,
        description,
        price,
        images,
        category: selectedCategories,
        sizes: selectedSizes,
        customization_zone: customizationZone,
        customization_preview_image: previewImage
      });
    } catch (err) {
      setError('Failed to save product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentLayout>
      <form onSubmit={handleSubmit}>
        <TextInput
          // @ts-ignore
          label="Product Name"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Textarea
          label="Description"
          placeholder="Enter product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
        <TextInput
          // @ts-ignore
          type="number"
          label="Price"
          placeholder="Enter product price"
          value={price}
          onChange={(e) => handlePriceChange(e)}
          required
        />
        <MultiSelect
          label="Category"
          placeholder="Select categories"
          value={selectedCategories}
          onChange={setSelectedCategories}
          required
        >
          {categories.map(category => (
            <MultiSelectOption key={category.id} value={category.id}>
              {category.name}
            </MultiSelectOption>
          ))}
        </MultiSelect>
        <MultiSelect
          label="Sizes"
          placeholder="Select sizes"
          value={selectedSizes}
          onChange={setSelectedSizes}
          required
        >
          {sizes.map(size => (
            <MultiSelectOption key={size.id} value={size.id}>
              {size.name}
            </MultiSelectOption>
          ))}
        </MultiSelect>
        <CustomizationArea onChange={handleCustomizationChange} previewImage={previewImage} customizationZone={customizationZone} />
        <Button type="submit" loading={loading} style={{ marginTop: '1rem' }}>
          Save Product
        </Button>
        {error && <div>{error}</div>}
      </form>
    </ContentLayout>
  );
};

export default ProductFormField;
