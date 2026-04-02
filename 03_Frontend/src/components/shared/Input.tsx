'use client';

import { TextField as LegionInput } from '@legion-ui-kit/react-core';
import type { ReactNode, ChangeEvent } from 'react';

export interface InputProps {
  variant?: 'default' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'search';
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  errorText?: string;
  helperText?: string;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

export function Input({
  variant = 'default',
  size = 'md',
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
  errorText,
  helperText,
  leftAddon,
  rightAddon,
  required = false,
  name,
  id,
  className = '',
}: InputProps) {
  return (
    <LegionInput
      status={variant}
      variant="outline"
      size={size}
      type={type}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      caption={variant === 'error' ? errorText : undefined}
      hint={helperText}
      iconLeft={leftAddon}
      iconRight={rightAddon}
      required={required}
      name={name}
      id={id}
      className={className}
    />
  );
}
