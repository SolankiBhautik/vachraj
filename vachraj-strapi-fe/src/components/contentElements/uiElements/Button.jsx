import React from 'react';
import { Button as ShadcnButton } from '../../ui/button';

const Button = ({ label, link, isExternal, fullyRounded }) => {
  return (
    <ShadcnButton
      asChild
      className={`${fullyRounded ? 'rounded-full' : 'rounded-md'}`}
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

export default Button;
