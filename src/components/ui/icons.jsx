import React from 'react';
import * as LucideIcons from 'lucide-react';

/**
 * Icon component that acts as a wrapper for Lucide icons with standardized styling
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Name of the Lucide icon to render
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.color - Color to apply (primary, secondary, accent, etc.)
 * @param {number} props.size - Icon size in pixels
 * @returns {JSX.Element} - The rendered icon
 */
export const Icon = ({ 
  name, 
  className = "", 
  color = "",
  size = 24,
  ...props 
}) => {
  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    muted: "text-muted-foreground",
    destructive: "text-destructive",
  };

  const colorClass = colorClasses[color] || color;
  const classes = `${colorClass} ${className}`;
  
  // Dynamic import of Lucide icon
  const LucideIcon = LucideIcons[name];
  
  if (!LucideIcon) {
    console.warn(`Icon '${name}' not found in Lucide icons`);
    return null;
  }
  
  return <LucideIcon className={classes} size={size} {...props} />;
};

/**
 * Custom SVGs not available in Lucide
 */

// You can add custom SVG components here if needed
export const CustomIcons = {
  // Example: CustomLogo: (props) => <svg {...props}>...</svg>
};

/**
 * Common app icons with predefined styles and components
 */
export const Icons = {
  // Navigation icons
  home: (props) => <Icon name="Home" {...props} />,
  calendar: (props) => <Icon name="Calendar" {...props} />,
  user: (props) => <Icon name="User" {...props} />,
  settings: (props) => <Icon name="Settings" {...props} />,
  menu: (props) => <Icon name="Menu" {...props} />,
  
  // Action icons
  search: (props) => <Icon name="Search" {...props} />,
  filter: (props) => <Icon name="Filter" {...props} />,
  plus: (props) => <Icon name="Plus" {...props} />,
  edit: (props) => <Icon name="Edit" {...props} />,
  delete: (props) => <Icon name="Trash2" {...props} />,
  close: (props) => <Icon name="X" {...props} />,
  check: (props) => <Icon name="Check" {...props} />,
  
  // Medical specific icons
  doctors: (props) => <Icon name="Briefcase" {...props} />,
  appointments: (props) => <Icon name="Calendar" {...props} />,
  specialties: (props) => <Icon name="Stethoscope" {...props} />,
  insurance: (props) => <Icon name="Shield" {...props} />,
  
  // Feedback icons
  info: (props) => <Icon name="Info" {...props} />,
  warning: (props) => <Icon name="AlertTriangle" {...props} />,
  success: (props) => <Icon name="CheckCircle" {...props} />,
  error: (props) => <Icon name="AlertOctagon" {...props} />,
  
  // App specific icons
  clipboard: (props) => <Icon name="Clipboard" {...props} />,
  
  // Add more icon mappings as needed
};
