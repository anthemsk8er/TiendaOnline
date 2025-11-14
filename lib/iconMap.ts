import React from 'react';
import * as Icons from '../components/product_detail_page/Icons';

export const iconMap: { [key: string]: React.FC<any> } = {
    'LeafIcon': Icons.LeafIcon,
    'BrainIcon': Icons.BrainIcon,
    'SmileyFaceIcon': Icons.SmileyFaceIcon,
    'BedIcon': Icons.BedIcon,
    'MentalBalanceIcon': Icons.MentalBalanceIcon,
    'PremiumQualityIcon': Icons.PremiumQualityIcon,
    'ScienceBackedIcon': Icons.ScienceBackedIcon,
    'WellbeingIcon': Icons.WellbeingIcon,
    'ShampooBottleIcon': Icons.ShampooBottleIcon,
    'ShieldCogIcon': Icons.ShieldCogIcon,
    'PlantIcon': Icons.PlantIcon,
    'CheckCircleIcon': Icons.CheckCircleIcon,
    'PackageIcon': Icons.PackageIcon,
    'TruckIcon': Icons.TruckIcon,
    'ShieldIcon': Icons.ShieldIcon,
    'MenuIcon': Icons.MenuIcon,
    'SearchIcon': Icons.SearchIcon,
    'ShoppingBagIcon': Icons.ShoppingBagIcon,
    'XMarkIcon': Icons.XMarkIcon,
    'CheckBadgeIcon': Icons.CheckBadgeIcon,
    'UserIcon': Icons.UserIcon,
    'ChatIcon': Icons.ChatIcon,
    'MapPinIcon': Icons.MapPinIcon,
    'AtSymbolIcon': Icons.AtSymbolIcon,
    'WalletIcon': Icons.WalletIcon,
    'SparklesIcon': Icons.SparklesIcon,
};

export const iconKeys = Object.keys(iconMap).sort();