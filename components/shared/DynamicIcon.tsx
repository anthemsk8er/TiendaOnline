import React from 'react';
import { iconMap } from '../../lib/iconMap';

interface DynamicIconProps {
  name: string;
  className?: string;
  strokeWidth?: number;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
    const IconComponent = iconMap[name];
    if (!IconComponent) {
        console.warn(`Icon "${name}" not found.`);
        return null; 
    }
    return <IconComponent {...props} />;
};

export default DynamicIcon;
