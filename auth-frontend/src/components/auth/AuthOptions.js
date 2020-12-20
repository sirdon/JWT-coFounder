import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext'
export default function AuthOptions() {
    //get the provided context from userContext
    const { userData, setUserData } = useContext(UserContext);
    // create history object 
    const history = useHistory();

    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const logout = () => {
        // clean the token and user data
        setUserData({
            token: undefined,
            user: undefined
        });
        // clean the session from browser storage
        localStorage.setItem("auth-token", "");
        // redirect the user to home page
        history.push("/login");
    };
    const services = () => history.push("/services");
    const products = () => history.push("/products");
    return (
        // if user logged in display logout button else display register and login button
        <nav className="auth-option">
            {
                userData.user ? (
                    <>
                    <button onClick={services}>Services</button>
                    <button onClick={products}>Products</button>
                    <button onClick={logout}>Log out</button>
                    </>

                ) : (
                        <>
                            <button onClick={register}>Register</button>
                            <button onClick={login}>Log in</button>
                        </>
                    )
            }
        </nav>
    )
}
