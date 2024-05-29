import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

//import Home from "./routes/home/home.component";
//import Navigation from "./routes/navigation/navigation.component.jsx";
// import Authentication from "./routes/authentication/authentication.component";
// import Shop from "./routes/shop/shop.component.jsx";
// import Checkout from "./routes/checkout/checkout.component.jsx";
// import Success from "./components/payment/success.jsx";
// import Cancel from "./components/payment/cancel.jsx";

import Spinner from "./components/spinner/spinner.component";

import { checkUserSession } from "./store/user/user.action.js";
// import {
//   onAuthStateChangedListener,
//   createUserDocumentFromAuth,
//   getCurrentUser
// } from "./utils/firebase/firebase.utils";
//using index to tell that if nothing is their in the path then show this home page, rather than giving the path.

const Home = lazy(() => import ("./routes/home/home.component")); //dynamic importing
const Navigation = lazy(() => import ("./routes/navigation/navigation.component.jsx"));
const Authentication = lazy(() => import ("./routes/authentication/authentication.component"));
const Shop = lazy(() => import ("./routes/shop/shop.component.jsx"));
const Checkout = lazy(() => import ("./routes/checkout/checkout.component.jsx"));
const Success = lazy(() => import ("./components/payment/success.jsx"));
const Cancel = lazy(() => import ("./components/payment/cancel.jsx"));

const App = () => {
  const dispatch = useDispatch();//it will only create 1 dispatch so 

  useEffect(() => {
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   if(user) {
    //     createUserDocumentFromAuth(user);
    //   }
    //   dispatch(setCurrentUser(user));
    // });

    // return unsubscribe;

    //getCurrentUser().then((user) => console.log(user)); for checking
    dispatch(checkUserSession());

  }, [dispatch]);//so not passing dispatch here doesn't change anything just linting error will be their cause hooks doesn't know it

  return (
    <Suspense fallback={<Spinner/>}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;