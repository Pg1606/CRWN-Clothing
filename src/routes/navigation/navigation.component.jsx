import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; 

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assests/crown.svg";
//import { UserContext } from "../../contexts/user.context";
//import { CartContext } from "../../contexts/cart.context";
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectCurrentUser } from "../../store/user/user.selector";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { signOutStart } from "../../store/user/user.action";

import {NavigationContainer, NavLinks, NavLink, LogoContainer} from './navigation.styles';
//Fragment renders to nothing when react mounts the component its just the component when u need a parent if any component. It also doesn't show in console HTML.

//Link is just like a anchor tag which helps to navigate to that link but this Link helps with diff browser.
const Navigation = () => {
  //const { currentUser } = useContext(UserContext);
  const currentUser = useSelector(selectCurrentUser);
  //const { isCartOpen } = useContext(CartContext);
  const isCartOpen = useSelector(selectIsCartOpen);
  //console.log(currentUser);
  const dispatch = useDispatch();
  
  const signOutUser = () => dispatch(signOutStart());

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;