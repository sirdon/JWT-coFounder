import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext'
export default function AuthOptions() {
    //get the provided context from userContext
    const { userData, setUserData } = useContext(UserContext);
    // create history object 
    const history = useHistory();

    const signUp= () => history.push("/signUp");
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
    const publish = () => history.push("/publish");
    const profile = () => history.push(`/user/${userData.user.username}`);
    return (
        // if user logged in display logout button else display sign up and login button
        <nav className="auth-option">
            {
                userData.user ? (
                    <>
                    <p>Hi {userData.user.username}</p>
                    <button onClick={profile}>Profile</button>
                    <button onClick={publish}>Publish</button>
                    <button onClick={logout}>Log out</button>
                    </>

                ) : (
                        <>
                            <button onClick={signUp}>Sign Up</button>
                            <button onClick={login}>Log in</button>
                        </>
                    )
            }
        </nav>
    )
}
