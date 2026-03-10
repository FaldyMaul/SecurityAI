'use client';

import { Input as LegionInput } from '@legion-ui-kit/react-core';
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

/**
 * Input - AI Sandbox Input component using Legion UI Input
 * 
 * Variants:
 * - default: Standard input style
 * - error: Error state with red border
 * - success: Success state with green border
 * 
 * @example
 * ```tsx
 * <Input 
 *   label="Email" 
 *   type="email"
 *   placeholder="Enter your email"
 *   helperText="We'll never share your email"
 * />
 * 
 * <Input 
 *   label="Password"
 *   type="password"
 *   variant="error"
 *   errorText="Password must be at least 8 characters"
 * />
 * 
 * <Input 
 *   leftAddon={<EmailIcon />}
 *   placeholder="Enter email"
 * />
 * ```
 */
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
      variant={variant}
      size={size}
      type={type}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      errorText={errorText}
      helperText={helperText}
      leftAddon={leftAddon}
      rightAddon={rightAddon}
      required={required}
      name={name}
      id={id}
      className={className}
    />
  );
}
