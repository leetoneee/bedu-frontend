import { usePathname } from 'next/navigation';

export const NavItems = () => {
  const pathname = usePathname();

  function isNavItemActive(pathname: string, nav: string) {
    return nav === '/' ? pathname === '/' : pathname.startsWith(nav);
  }

  return [
    {
      name: 'Homepage',
      href: '/',
      active: isNavItemActive(pathname, '/')
    },
    {
      name: 'Self-study Program',
      href: '/self-study-program',
      active: isNavItemActive(pathname, '/self-study-program')
    },
    {
      name: 'Live Program',
      href: '/live-program',
      active: isNavItemActive(pathname, '/live-program')
    },
    {
      name: 'Feedback',
      href: '/feedback',
      active: isNavItemActive(pathname, '/feedback')
    }
  ];
};
