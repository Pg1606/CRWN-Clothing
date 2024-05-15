import { useDispatch, useSelector } from 'react-redux';
//import { CartContext } from '../../contexts/cart.context';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

import {CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton} from './checkout-item.styles';

const CheckoutItem = ({cartItem}) => {
  const {imageUrl, name, quantity, price} = cartItem;
  const cartItems = useSelector(selectCartItems);
  //const {addItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext);
  const dispatch = useDispatch();

  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));

  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

  const clearCartItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>
          &#10095;
        </Arrow>
      </Quantity>
      <BaseSpan>${price}</BaseSpan>
      <RemoveButton onClick={clearCartItemHandler}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;