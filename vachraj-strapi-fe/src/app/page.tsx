// src/app/page.tsx
import '/src/styles/globals.css';
import React from 'react';
import { fetchData } from '../lib/fetchData';
import Hero from '../components/contentElements/section/Hero';
import FeatureProduct from '../components/contentElements/section/FeatureProduct';




export default async function DynamicPage() {
  try {
    const pageData = await fetchData(`/api/home-page?populate=deep`);
    const products = await fetchData(`/frame/products/featured`);

    const pageAttributes = pageData.data.attributes;

    const heroData = pageAttributes.Content.find(content => content.__component === 'section.hero');

    const featureProductData = pageAttributes.Content.find(content => content.__component === 'section.feature-product');

    if (!pageAttributes) {
      return <h1>Page Not Found</h1>;
    }
    return (
      <>
        {heroData && <Hero {...heroData} />}
        {featureProductData && <FeatureProduct {...featureProductData} products={products} />}
      </>
    );
  } catch (error) {
    console.error('Error fetching page data:', error);
    return <h1>Error loading page</h1>;
  }
}
