import React from 'react';
import { fetchData } from '../../lib/fetchData';
import Hero from '../../components/contentElements/section/Hero';


export default async function DynamicPage({ params }: { params: { slug: string[] } }) {
  const id = params.slug.join('/');
  try {
    const pageData = await fetchData(`/api/pages?filters[id][$eq]=${id}&populate[Content][populate]=*`);

    const pageAttributes = pageData.data[0]?.attributes;

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
