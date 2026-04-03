import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { exit } from '../../services/slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(exit());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
