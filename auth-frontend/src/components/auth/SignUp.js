import React, { useState, useContext, useEffect } from 'react'
import Axios from 'axios';
import UserContext from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Error from '../errors/Error';

export default function SignUp() {
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const {  userData,setUserData } = useContext(UserContext);
  const [error, setError] = useState();
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // signUp user
      const newUser = { name, age, username, email, password, passwordCheck };
      await Axios.post("http://localhost:5000/api/users/signUp",
        newUser);
      // make self call for login
      const loginUser = { username, password };
      const loginRes = await Axios.post("http://localhost:5000/api/users/login",
        loginUser);
      // create session for the signUp user
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user
      });
      // storage session token in browser storage
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  }

  useEffect(() => {
    // redirect logged in user to home page
    if(userData.user) history.push(`/user/${userData.user.username}`);
  },[userData])

  return (
    <div className="page">
      <h2>Sign Up</h2>
      {/*  display error message */}
      {error && (<Error message={error} clearError={() => setError(undefined)}></Error>)}
      {/* signUpation form */}
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="signUp-name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="signUp-age">
          <Form.Label>Age</Form.Label>
          <Form.Control type="number" placeholder="Enter your age"
            onChange={(e) => setAge(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="signUp-username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username must be unique"
            onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="signUp-email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="signUp-password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group >
          <Form.Control type="password" placeholder="Verify password"
            onChange={(e) => setPasswordCheck(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  )
}
