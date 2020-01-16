import React, { useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
// import Products from './Products'
import Checkout from "./components/Checkout";
// import { products } from '../products'

const history = createBrowserHistory();

const App = () => {
  //const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      name: "Rubber Duck",
      desc: `Rubber ducks can lay as many eggs as the best chicken layers, and they
    are fun to watch with their antics in your backyard, your barnyard, or
    your pond.`,
      price: 9.99,
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSqkN8wkHiAuT2FQ14AsJFgihZDzKmS6OHQ6eMiC63rW8CRDcbK",
      id: 100
    },
    {
      name: "Chilli Sauce",
      desc: `This Chilli Sauce goes well with some nice roast rubber duck. Flavoured with
      the best spices and the hottest chillis, you can rest assured of a tasty Sunday
      rubber roast.`,
      price: 12.99,
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRTREm1dEzdI__xc6O8eAz5-4s88SP-Gg9dWYMkBKltGMi84RW5",
      id: 101
    }
  ];

  const selectedProduct = products[0];

  return (
    <Router history={history}>
      <Switch>
        {/* <Route
          exact
          path="/"
          render={() => (
            <Products
              products={products}
              selectProduct={setSelectedProduct}
              history={history}
            />
          )}
        /> */}
        <Route
          path="/checkout"
          render={() => (
            <Checkout selectedProduct={selectedProduct} history={history} />
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
