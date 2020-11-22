import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { StateContext, DispatchContext } from "../contexts";
import actionType from "../constants";

function ProfileScreen(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { userSignin: {userInfo} } = state;

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    dispatch({ type: actionType.USER_LOGOUT });
    props.history.push("/signin");
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const user = { userId: userInfo._id, name, email, password };
    dispatch({ type: actionType.USER_UPDATE_PROFILE_REQUEST, payload: user });
    try {
      const { data } = await Axios.put(
        process.env.REACT_APP_SERVER_URL+`/api/users/profile`,
        user,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log('data=')
      console.log(data)
      dispatch({ type: actionType.USER_UPDATE_PROFILE_SUCCESS, payload: data });
      dispatch({ type: actionType.USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      const message = error.response.data.message;
      dispatch({ type: actionType.USER_UPDATE_PROFILE_FAIL, payload: message });
      if(error.response.status == 401){
        localStorage.removeItem("userInfo");
        localStorage.removeItem("cartItems");
        dispatch({ type: actionType.USER_LOGOUT });
        props.history.push("/signin");
      }
    }
  }

  return <div className="profile">
    <div className="profile-info">
      <div className="form">
        <form onSubmit={submitHandler} >
          <ul className="form-container">
            <li>
              <h2>User Profile</h2>
            </li>
            <li>
              <label htmlFor="name">
                Name
          </label>
              <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="email">
                Email
          </label>
              <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
              </input>
            </li>

            <li>
              <button type="submit" className="button primary">Update</button>
            </li>
            <li>

              <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>
            </li>

          </ul>
        </form>
      </div>
    </div>
  </div>

}

export default ProfileScreen;