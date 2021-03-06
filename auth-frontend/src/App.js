import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Header from './components/Layout/Header';
import React, { useState, useEffect } from 'react'
import UserContext from './context/UserContext';
import Axios from 'axios';
import User from './components/pages/User';
import Publish from './components/pages/Publish';
import Tag from './components/pages/Tag';


function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      // check token existance
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      // validate the token
      const tokenRes = await Axios.post("http://localhost:5000/api/users/tokenIsValid",
        null, {
        headers: { "x-auth-token": token }
      })
      // get logged in user
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/api/users/", {
          headers: { "x-auth-token": token }
        });
        // set session for the looged in user
        setUserData({
          token,
          user: userRes.data
        });
      }
    };
    checkLoggedIn();
  }, []);
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header></Header>
          <Switch>
            <Route path="/" component={Home} exact></Route>
            <Route path="/login" component={Login} ></Route>
            <Route path="/signUp" component={SignUp} ></Route>
            <Route path="/user" component={User} ></Route>
            <Route path="/publish" component={Publish} ></Route>
            <Route paht="/tag" component={Tag}></Route>
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
