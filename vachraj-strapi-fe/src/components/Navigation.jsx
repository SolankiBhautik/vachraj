import React from 'react';
import Link from 'next/link';

const Navigation = ({ navItems }) => {
  return (
    <nav className="navigation bg-gray-800 p-4">
      <ul className="flex space-x-6">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link 
              href={`/${item.id}`} 
              className="text-white hover:text-gray-300 transition-colors duration-300"
              id={item.id}
            >
              {item.Page}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
