import React, { useContext, useEffect } from 'react';
import axios from "axios";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import { StateContext, DispatchContext } from "../contexts"
import actionType, { SERVER_URL } from "../constants";

const HomeScreen = () => {
  const { products } = useContext(StateContext);
  const { items, loading, error} = products;
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch({ type: actionType.PRODUCT_LIST_REQUEST });
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + "/api/products"
        );
        dispatch({ type: actionType.PRODUCT_LIST_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: actionType.PRODUCT_LIST_FAIL,
          payload: error.message,
        });
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <ul className="products">
          {items.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
}
export default HomeScreen;