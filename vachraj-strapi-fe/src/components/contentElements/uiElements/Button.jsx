import React from 'react';
import { Button as ShadcnButton } from '../../ui/button';

export const Button = ({ label, link, isExternal, fullyRounded, className = '' }) => {
  return (
    <ShadcnButton
      asChild
      className={`${fullyRounded ? 'rounded-full' : 'rounded-md'} ${className}`}
    >
      <a
        href={link}
        target={isExternal ? '_blank' : '_self'}
        rel={isExternal ? 'noopener noreferrer' : ''}
      >
        {label}
      </a>
    </ShadcnButton>
  );
};

