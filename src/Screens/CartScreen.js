import React, { useEffect, useContext, useReducer } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import * as QueryString from "query-string";

import actionType, { SERVER_URL } from "../constants";
import { StateContext, DispatchContext } from "../contexts";

function CartScreen(props) {
  const { cartItems } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const productId = props.match.params.id;
  const { qty } = QueryString.parse(props.location.search);

  const addToCart = async (productId, qty) => {
    const { data } = await Axios.get(
      process.env.REACT_APP_SERVER_URL + "/api/products/" + productId
    );
    dispatch({
      type: actionType.CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: actionType.CART_REMOVE_ITEM, payload: productId });
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  useEffect(() => {
    if (productId) {
      addToCart(productId, qty);
    }
  }, []);

  useEffect(()=>{
   localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems])

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <li key={item.product}>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>{item.name}</Link>
                  </div>
                  <div>
                    Qty:
                    <select
                      value={item.qty}
                      onChange={(e) => addToCart(item.product, e.target.value)}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="button"
                      onClick={() => removeFromCart(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">${item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ( {cartItems.reduce((a, c) => a + Number(c.qty), 0)} items) : ${" "}
          {cartItems.reduce((a, c) => a + Number(c.price) * Number(c.qty), 0)}
        </h3>
        <button
          onClick={checkoutHandler}
          className="button primary full-width"
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartScreen;
