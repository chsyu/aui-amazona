import React from "react";

const ShoppingAction = ({price}) => {
   return (
      <div className="details-action">
         <ul>
            <li>Price: {price}</li>
            <li>Status: </li>
            <li>
               Qty:{" "}
               <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
               </select>
            </li>
            <li>
               <button className="button primary">Add to Cart</button>
            </li>
         </ul>
      </div>

   )
}

export default ShoppingAction;