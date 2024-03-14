import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component.jsx";

import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";

const Shop = () => {
  return <h1>This is the Shop Page</h1>;
};
//using index to tell that if nothing is their in the path then show this home page, rather than giving the path.
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />       <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;