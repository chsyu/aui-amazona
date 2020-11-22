import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StateContext, DispatchContext } from "../contexts";
import actionType from "../constants"

const Aside = () => {
  const dispatch = useContext(DispatchContext);
  const { aside: {open} } = useContext(StateContext);

  return (
    <aside className={`${open ? "sidebar open" : "sidebar"}`}>
      <h3 className="sidebar-header">Shopping Categories</h3>
      <button
        className="sidebar-close-button hideLarge"
        onClick={() => dispatch({type: actionType.CLOSE_ASIDE})}
      >
        x
      </button>
      <ul>
        <li>
          <Link to="/">Pants</Link>
        </li>

        <li>
          <Link to="/">Shirts</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
