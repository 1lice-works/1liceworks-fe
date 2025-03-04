import { useLocation } from 'react-router-dom';

import { CalendarLnb } from './CalendarLnb';
import { TeamLnb } from './TeamLnb';

export const Lnb = () => {
  const location = useLocation();
  const path = location.pathname;

  if (path.startsWith('/team')) {
    return <TeamLnb />;
  }

  return <CalendarLnb />;
};
