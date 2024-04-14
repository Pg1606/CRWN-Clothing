import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context.jsx';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component.jsx';

import {ProductCardContainer, Footer, Name, Image} from './product-card.styles';

const ProductCard = ({ product }) => {
  const {name, price, imageUrl} = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

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