import { UserIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const NavItems = () => {
  const pathname = usePathname();

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.startsWith(nav);
  }

  return [
    {
      name: 'Personal Information',
      href: '/my/profile',
      active: isNavItemActive(pathname, '/my/profile'),
      icon: <UserIcon className="size-6" />
    },
    {
      name: 'Purchased Courses',
      href: '/my/courses',
      active: isNavItemActive(pathname, '/my/courses'),
      icon: <VideoCameraIcon className="size-6" />
    }
  ];
};
