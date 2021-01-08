import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import AuthOptions from '../auth/AuthOptions';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SearchIcon from '@material-ui/icons/Search';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import Axios from 'axios';
export default function Header() {
  const [tag, setTag] = useState();
  const [formTag, setFormTag] = useState();
  const history = useHistory();
  const handleClick = ()=>{
   setFormTag("");
   
    if(tag) history.push({
    pathname: `/tag/${tag}`,
    tagstate:{tag}
  });
    
  }
  return (
    <header id="header">
      <Link to="/"> <HomeRoundedIcon /></Link>
      <InputGroup className="mb-3">
        <FormControl id="search"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Search by tag"
          onChange={(e) => {return (setTag(e.target.value), setFormTag(e.target.value)
          )}} 
          value={formTag}
        />
        <button onClick={handleClick}><SearchIcon></SearchIcon></button>
      </InputGroup>
      <AuthOptions></AuthOptions>
    </header>
  )
}
