import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({product}) => {
   return (
     <li>
       <div className="product">
         <img className="product-image" src={product.image} alt="product" />
         <div className="product-name">
           <Link to={"/product/" + product._id}>{product.name}</Link>
         </div>
         <Rating
           rating={product.rating}
           numReviews={product.numReviews}
         ></Rating>
         <div className="product-price">${product.price}</div>
       </div>
     </li>
   );
}

export default Product;