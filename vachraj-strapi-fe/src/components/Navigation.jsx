import React from 'react';
import Link from 'next/link';

const Navigation = ({ navItems }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-white dark:border-slate-50/[0.06] border-b border-slate-900/10  supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75 full layout-container">
      <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200 py-4">
        <ul className="flex space-x-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={`/${item.slug}`}
                className="hover:text-sky-500 dark:hover:text-sky-400"
                id={item.id}
              >
                {item.Page}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
