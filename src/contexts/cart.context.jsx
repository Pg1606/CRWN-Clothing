import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  //find if cartItems container productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  //if found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id
      ? {...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
    );
  }

  //return new array with modified cartItems/new cart item
  return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems, productToRemove) => {
  //find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  //check if quantity is equal to 1, if ir is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  //return back cartItems with matching cart item withreduced quantity
  return cartItems.map((cartItem) => cartItem.id === productToRemove.id
      ? {...cartItem, quantity: cartItem.quantity - 1}
      : cartItem
  );
};

const clearCartItem = (cartItems, productToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== productToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItem: [],
  clearItemFromCart: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItem, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItem.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItem]);

  useEffect(() => {
    const newCartTotal = cartItem.reduce(
      (total, cartItem) => total + (cartItem.quantity * cartItem.price),
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItem]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItem, productToAdd));
  }

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItem, productToRemove));
  }

  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItem, productToClear));
  }

  const value = { isCartOpen, setIsCartOpen, clearItemFromCart, addItemToCart, removeItemFromCart, cartItem, cartCount, cartTotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};