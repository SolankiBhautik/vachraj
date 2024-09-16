import React from 'react';
import { Button as ShadcnButton } from '../../ui/button';


export const Button = ({
  label,
  link,
  isExternal = false,
  fullyRounded = false,
  className = '',
  onClick, 
}) => {
  const buttonContent = <span>{label}</span>;

  return (
    <ShadcnButton
      asChild={!onClick} 
      className={`${fullyRounded ? 'rounded-full' : 'rounded-md'} ${className}`}
      onClick={onClick} 
    >
      {link ? (
        <a
          href={link}
          target={isExternal ? '_blank' : '_self'}
          rel={isExternal ? 'noopener noreferrer' : ''}
        >
          {buttonContent}
        </a>
      ) : (
        buttonContent
      )}
    </ShadcnButton>
  );
};
