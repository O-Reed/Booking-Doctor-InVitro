import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines Tailwind CSS classes and resolves conflicting class names.
 * Used for conditional application of Tailwind classes in components.
 * 
 * @param {...any} inputs - Class names to be merged
 * @returns {string} - Merged class string with conflicts resolved
 * 
 * @example
 * cn('text-red-500', condition && 'bg-blue-500', 'p-4')
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Safely access nested object properties
 * 
 * @param {Object} obj - The object to access
 * @param {string} path - Dot notation path to property
 * @param {any} defaultValue - Value to return if path not found
 * @returns {any} - The value at path or defaultValue
 * 
 * @example
 * getNestedValue(user, 'profile.address.city', 'Unknown')
 */
export function getNestedValue(obj, path, defaultValue = undefined) {
  if (!obj || !path) return defaultValue;
  
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    result = result?.[key];
    if (result === undefined) return defaultValue;
  }
  
  return result;
}

/**
 * Debounce function to limit how often a function is called
 * 
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 * 
 * @example
 * const debouncedSearch = debounce(handleSearch, 300)
 */
export function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}
