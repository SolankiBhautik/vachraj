import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CustomizationArea from './CustomizationArea';
import MultiSelect from './MultiSelect';
import {
  TextInput,
  Textarea,
  Box,
  Flex,
  Typography,
  Button,
  ContentLayout,
} from '@strapi/design-system';
import { Trash, Upload } from '@strapi/icons';

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

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResponse, sizeResponse] = await Promise.all([
          axios.get('/frame/category/list?populate=*'),
          axios.get('/frame/size/list?populate=*'),
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

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    setPrice(value);
  };

  const handleCustomizationChange = (data) => {
    setCustomizationZone(data.updatedIndicators);
    setPreviewImage(data.image);
  };

  // Function to upload the image file
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('files', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data[0].id;
    } catch (error) {
      console.error('Failed to upload image', error);
      throw error;
    }
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const fileId = await uploadImage(file);
        return {
          id: fileId,
          url: URL.createObjectURL(file),
        };
      })
    );
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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

  const handleTriggerFileInput = () => {
    fileInputRef.current.click();
  };




  return (
    <ContentLayout>
      <form onSubmit={handleSubmit}>
        <Flex padding="2" justifyContent="flex-end">
          <Box>
            <Button
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Box>
        </Flex>
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
        <Box>
          <Typography variant="pi" fontWeight="bold">
            Product Images
          </Typography>
          <Box marginTop={2}>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button variant="secondary" startIcon={<Upload />} onClick={handleTriggerFileInput}>
                Upload Images
              </Button>
            </label>
          </Box>
          {images.length > 0 && (
            <Flex wrap="wrap" gap={4} marginTop={4}>
              {images.map((image, index) => (
                <Box key={index} width="100px" height="100px" position="relative">
                  <img
                    src={image.url}
                    alt={`Product image ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Button
                    variant="danger-light"
                    startIcon={<Trash />}
                    onClick={() => handleImageDelete(index)}
                    size="S"
                    style={{ position: 'absolute', top: '4px', right: '4px' }}
                  >
                    Delete
                  </Button>
                </Box>
              ))}
            </Flex>
          )}
        </Box>
        <MultiSelect
          placeholder="Select categories"
          label="Categories"
          value={selectedCategories}
          onChange={setSelectedCategories}
          attribute={categories}
        />
        <MultiSelect
          placeholder="Select sizes"
          label="Sizes"
          value={selectedSizes}
          onChange={setSelectedSizes}
          attribute={sizes}
        />
        <CustomizationArea onChange={handleCustomizationChange} previewImage={previewImage} customizationZone={customizationZone} />
        {error && <div>{error}</div>}
      </form>
    </ContentLayout>
  );
};

export default ProductFormField;
