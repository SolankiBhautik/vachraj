// src/app/page.tsx
import '/src/styles/globals.css';
import React, { Suspense } from 'react';
import { fetchData } from '../lib/fetchData';
import Hero from '../components/contentElements/section/Hero';
import FeatureProduct from '../components/contentElements/section/FeatureProduct';



const components = {
  'section.hero': Hero,
  'section.feature-product': FeatureProduct,
};


export default async function DynamicPage() {
  try {
    const pageData = await fetchData(`/api/pages?filters[slug][$eq]=home`);
    const pageAttributes = pageData[0];

    if (!pageAttributes) {
      return <h1>Page Not Found</h1>;
    }

    return (
      <>
        {/* Render components dynamically */}
        {pageAttributes.Content.map((content, index) => {
          const Component = components[content.__component];
          if (Component) {
            return <Component key={index} {...content} />;
          }
          return null;
        })}
      </>
    );
  } catch (error) {
    console.error('Error fetching page data:', error);
    return <h1>Error loading page</h1>;
  }
}
