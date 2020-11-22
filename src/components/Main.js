import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeScreen from "../Screens/HomeScreen";
import ProductScreen from "../Screens/ProductScreen";
import CartScreen from "../Screens/CartScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import SigninScreen from "../Screens/SigninScreen";
import ShippingScreen from "../Screens/ShippingScreen";
import ProfileScreen from "../Screens/ProfileScreen";

const Main = () => {
   return (
     <main className="main">
       <div className="content">
         <Switch>
           <Route path="/profile" component={ProfileScreen} />
           <Route path="/product/:id" component={ProductScreen} />
           <Route path="/cart/:id?" component={CartScreen} />
           <Route path="/signin" component={SigninScreen} />
           <Route path="/register" component={RegisterScreen} />
           <Route path="/shipping" component={ShippingScreen} />
           <Route path="/" exact={true} component={HomeScreen} />
         </Switch>
       </div>
     </main>
   );
}

export default Main;