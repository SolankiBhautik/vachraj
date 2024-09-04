// src/app/layout.tsx

import '../styles/globals.css';
import '../styles/animations.css';

import Navigation from '../components/Navigation';
import TransitionWrapper from '../components/TransitionWrapper';

import { fetchData } from '../lib/fetchData';

export default async function Layout({ children }) {
  let navItems = [];

  try {
    const navigationData = await fetchData('/api/navigation?populate=*');
    navItems = navigationData.data?.attributes?.pages?.data.map(page => ({
      ...page.attributes,
      link: `/${page.attributes.slug}`,
      id : page.id
    })) || [];
  } catch (error) {
    console.error('Error fetching navigation data:', error);
  }

  return (
    <html>
      <body className='bg-background'>
        <Navigation navItems={navItems} />
        <TransitionWrapper>
          <main>
            {children}
          </main>
        </TransitionWrapper>
      </body>
    </html>
  );
}
