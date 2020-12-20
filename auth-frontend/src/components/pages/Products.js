import React, { useEffect, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext'

export default function Products() {
  const { userData} = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    // restrict non-loggend in user to access home page
    if(!userData.user) history.push("/login");
  },[])
  return (
      <h1 className="products">PRODUCTS</h1>
  )
}
