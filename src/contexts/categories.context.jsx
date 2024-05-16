/////////////////////NOT REQUIRED ANYMORE////////////




import { createContext, useState, useEffect } from "react";

//import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

//import PRODUCTS from '../shop-data.json';
//import SHOP_DATA from "../shop-data.js";//after running the useEffect once we don't need it anymore.

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  /*useEffect(() => {
    addCollectionAndDocuments('categories', SHOP_DATA)
  }, []);
  
  //removing this useEffect after runnig this once cause we don't want it to run and set new values inside the database.
  */

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};