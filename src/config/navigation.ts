export interface NavItem {
  id: string;
  title: string;
  href: string;
  iconName: 'LayoutDashboard' | 'Layers' | 'FileText' | 'Settings' | 'Users';
  allowedRoles?: string[];
  description?: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    href: '/dashboard',
    iconName: 'LayoutDashboard',
    description: 'Overview of system metrics and primary activities',
  },
  {
    id: 'records',
    title: 'Records & Data',
    href: '/records',
    iconName: 'Layers',
    description: 'Manage master records, transactions, and data lists',
  },
  {
    id: 'reports',
    title: 'Reports',
    href: '/reports',
    iconName: 'FileText',
    description: 'Generate and export tabular summary reports',
  },
  {
    id: 'settings',
    title: 'Settings',
    href: '/settings',
    iconName: 'Settings',
    description: 'Configure application preferences and system parameters',
  },
];
