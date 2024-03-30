import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const { cartItem } = useContext(CartContext);
  const navigate = useNavigate();

  const checkoutPageHandler = () => {
    navigate("/checkout");
  };

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItem.map((item) => <CartItem key={item.id} cartItem={item} />
      )}
      </div>
        <Button onClick={checkoutPageHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;