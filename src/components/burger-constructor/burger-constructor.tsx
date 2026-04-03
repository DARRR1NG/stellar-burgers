import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  clearOrder,
  createOrder,
  getOrder
} from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { clearConstructor } from '../../services/slices/burger-constructor-slice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);

  const constructorItems = {
    bun,
    ingredients
  };

  const { isLoading: orderRequest, order: orderModalData } = useSelector(
    (state) => state.order
  );

  const isAuth = useSelector((state) => state.user.isLogin);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuth) {
      navigate('/login');
      return;
    }
    const infoOrder = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (item: TConstructorIngredient) => item._id
      ),
      constructorItems.bun._id
    ];
    dispatch(createOrder(infoOrder)).then(() => dispatch(clearConstructor()));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
