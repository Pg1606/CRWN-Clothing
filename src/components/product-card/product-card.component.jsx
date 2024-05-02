import { useDispatch, useSelector } from 'react-redux';

//import { CartContext } from '../../contexts/cart.context.jsx';

import { selectCartItems } from '../../store/cart/cart.selector.js';
import { addItemToCart } from '../../store/cart/cart.action.js';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component.jsx';

import {ProductCardContainer, Footer, Name, Image} from './product-card.styles';

const ProductCard = ({ product }) => {
  const {name, price, imageUrl} = product;
  //const { addItemToCart } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCardContainer>
      <Image src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <span className='price'>${price}</span>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;