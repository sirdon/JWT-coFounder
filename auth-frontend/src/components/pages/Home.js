import React, { useEffect, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import HomeIcon from '@material-ui/icons/Home';
export default function Home() {
  const { userData} = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    // restrict non-loggend in user to access home page
    if(!userData.user) history.push("/login");
  },[])
  return (
    <div className="home-page">
      <h1 className="home">Home</h1>
    </div>
  )
}
