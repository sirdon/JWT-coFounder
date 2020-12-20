import React from 'react';
import {Link} from 'react-router-dom'
import AuthOptions from '../auth/AuthOptions';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
export default function Header() {
  return (
    <header id="header">
      <Link to="/"> <HomeRoundedIcon/></Link>
      <AuthOptions></AuthOptions>
    </header>
  )
}
