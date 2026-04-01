import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { personalOrder } from '../../services/slices/personalOrderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.personalOrder.order);
  useEffect(() => {
    dispatch(personalOrder());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
