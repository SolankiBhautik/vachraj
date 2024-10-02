import React from 'react';
import { Button as ShadcnButton } from '../../ui/button';
import Link from 'next/link';


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
        <Link
          href={link}
          target={isExternal ? '_blank' : '_self'}
          rel={isExternal ? 'noopener noreferrer' : ''}
        >
          {buttonContent}
        </Link>
      ) : (
        buttonContent
      )}
    </ShadcnButton>
  );
};
