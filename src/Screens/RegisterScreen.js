import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import * as QueryString from "query-string";
import axios from "axios";

import { StateContext, DispatchContext } from "../contexts"
import actionType, { SERVER_URL } from "../constants";

function RegisterScreen(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const { userRegister } = useContext(StateContext);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useContext(DispatchContext);
  const { redirect } = QueryString.parse(props.location.search);
  
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      alert("Password and confirm password are not match");
    } else {
      dispatch({
        type: actionType.USER_REGISTER_REQUEST,
        payload: { email, password },
      });
      try {
        const { data } = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/api/users/register",
          {
            name,
            email,
            password,
          }
        );
        dispatch({ type: actionType.USER_REGISTER_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        dispatch({
          type: actionType.USER_REGISTER_FAIL,
          payload: error.message,
        });
      }
    }
  }
  
  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Create Account</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </li>
        <li>
          <label htmlFor="name">
            Name
          </label>
          <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="rePassword">Re-Enter Password</label>
          <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Register</button>
        </li>
        <li>
          Already have an account?
          <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center" >Sign In your amazona account</Link>

        </li>

      </ul>
    </form>
  </div>
}
export default RegisterScreen;