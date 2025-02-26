import { useLocation } from 'react-router-dom';

import { CalendarGnb } from './CalendarGnb';
import { TeamGnb } from './TeamGnb';

export const Gnb = () => {
  const location = useLocation();
  const path = location.pathname;

  if (path.startsWith('/team')) {
    return <TeamGnb />;
  }

  return <CalendarGnb />;
};
