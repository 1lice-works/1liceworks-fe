import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/constants/routes';
import { GnbType } from '@/widgets/gnb/model/types';
import CalendarIcon from '@/widgets/gnb/ui/assets/calendar.svg?react';
import TeamIcon from '@/widgets/gnb/ui/assets/document.svg?react';

interface LogoProps {
  type: GnbType;
}

const LOGO_CONFIG = {
  calendar: {
    path: ROUTES.CALENDAR.root,
    icon: <CalendarIcon className='h-8 w-8' />,
    text: 'Calendar',
    textColor: '',
  },
  team: {
    path: ROUTES.TEAM.root,
    icon: <TeamIcon className='h-8 w-8' />,
    text: 'Team',
    textColor: 'text-white',
  },
};

export const Logo = ({ type }: LogoProps) => {
  const config = LOGO_CONFIG[type];

  return (
    <Link to={config.path} className='flex items-center gap-x-4'>
      {config.icon}
      <p className={`text-xl ${config.textColor}`}>{config.text}</p>
    </Link>
  );
};
