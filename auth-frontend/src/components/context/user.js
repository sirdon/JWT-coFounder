import React, { useState, useContext, useEffect } from 'react'
import Axios from 'axios';
import UserContext from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Error from '../components/errors/Error';

export default function User() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const { userData, setUserData } = useContext(UserContext);
  const [error, setError] = useState();
  const history = useHistory();

  // handle the login form data
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent reloading
    try {
      // request to login 
      const loginUser = { username, password };
      const loginRes = await Axios.post("http://localhost:5000/api/users/login",
        loginUser);
      // create session for the logged in user
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user
      });
      // store session token in browser storage
      localStorage.setItem("auth-token", loginRes.data.token);
      // redirect user to home page
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  }

  useEffect(() => {
    // redirect logged in user to home page
    if (userData.user) history.push(`/user/${username}`);
  }, [userData])
  return (
    <div className="page">
      <h2 >Login</h2>
      {/* display error message */}
      {error && (<Error message={error} clearError={() => setError(undefined)}></Error>)}
      {/* login form */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Log in
        </Button>
      </Form>
    </div>
  )
}
