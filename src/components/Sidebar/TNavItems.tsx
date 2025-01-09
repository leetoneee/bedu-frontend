import { usePathname } from 'next/navigation';
import {
  LightBulbIcon,
  VideoCameraIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  BanknotesIcon,
  DocumentChartBarIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
  BellIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline';
import { GoTasklist } from 'react-icons/go';

export const TNavItems = () => {
  const pathname = usePathname();

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.includes(nav);
  }

  return [
    {
      name: 'Self-study Program',
      href: '/teacher/self-study-program',
      icon: <LightBulbIcon className="size-6" />,
      active: isNavItemActive(pathname, '/teacher/self-study-program'),
      group: 'program'
    },
    {
      name: 'Live Program',
      href: '/teacher/live-program',
      icon: <VideoCameraIcon className="size-6" />,
      active: isNavItemActive(pathname, '/teacher/live-program'),
      group: 'program'
    },
    {
      name: 'Schedule',
      href: '/teacher/schedule',
      icon: <CalendarDaysIcon className="size-6" />,
      active: isNavItemActive(pathname, '/teacher/schedule'),
      group: 'program'
    },
    {
      name: 'Courses',
      href: '/teacher/courses',
      icon: <BookOpenIcon className="size-6" />,
      active: isNavItemActive(pathname, '/teacher/courses'),
      group: 'resources'
    },
    {
      name: 'Question Bank',
      href: '/teacher/question-bank',
      icon: <BuildingLibraryIcon className="size-6" />,
      active: isNavItemActive(pathname, '/teacher/question-bank'),
      group: 'resources'
    },
    {
      name: 'Exams',
      href: '/teacher/exams',
      icon: <GoTasklist className="size-6" />,
      active: isNavItemActive(pathname, '/teacher/exams'),
      group: 'resources'
    },
  ];
};
