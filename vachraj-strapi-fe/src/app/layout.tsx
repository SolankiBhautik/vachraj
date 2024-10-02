// src/app/layout.tsx

import '../styles/globals.css';
import '../styles/layout.css';

import Navigation from '../components/Navigation';

export default async function Layout({ children }) {


  return (
    <html className='dark'>
      <body className='bg-background'>
        <main className="layout-container">
          <Navigation />
          {children}
        </main>
      </body>
    </html>
  );
}
