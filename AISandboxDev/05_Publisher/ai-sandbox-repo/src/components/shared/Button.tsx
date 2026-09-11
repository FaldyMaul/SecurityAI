'use client';

import type { ReactNode } from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

/**
 * Button - AI Sandbox Button component using Legion UI Button
 * 
 * Variants:
 * - primary: Main actions (uses AI Sandbox primary blue #1545BC)
 * - secondary: Secondary actions (uses AI Sandbox secondary purple #7740B5)
 * - outline: Outlined buttons for less prominent actions
 * - ghost: Minimal styling for inline actions
 * - danger: Destructive actions
 * - link: Link-style button
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleSave}>
 *   Save Changes
 * </Button>
 * 
 * <Button variant="primary" loading leftIcon={<SaveIcon />}>
 *   Saving...
 * </Button>
 * ```
 */
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  type = 'button',
  className = '',
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      className={[
        styles.button,
        styles[size],
        styles[variant],
        fullWidth ? styles.fullWidth : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {leftIcon}
      {loading ? 'Loading...' : children}
      {rightIcon}
    </button>
  );
}
