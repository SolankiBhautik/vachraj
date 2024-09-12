// src/app/page.tsx
import '/src/styles/globals.css';

import React from 'react';
import Hero from '../components/contentElements/section/Hero';
import { fetchData } from '../lib/fetchData';

export default async function DynamicPage() {

  try {
    const pageData = await fetchData(`/api/pages?filters[slug][$eq]=home`);

    const pageAttributes = pageData[0];

    if (!pageAttributes) {
      return <h1>Page Not Found</h1>;
    }

    return (
      <div className="container mx-auto">
        {/* Render other page components based on the fetched data */}
        {pageAttributes.Content.map((content, index) => {
          if (content.__component === 'section.hero') {
            return (
              <Hero
                key={index}
                heading={content.Heading}
                description={content.Description}
                image={content.Image}
                link={content.Button}
              />
            );
          }
          return null;
        })}
      </div>
    );
  } catch (error) {
    console.error('Error fetching page data:', error);
    return <h1>Error loading page</h1>;
  }
}
