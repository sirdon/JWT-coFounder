import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import { Button, Form } from 'react-bootstrap';
import Axios from 'axios';
import Error from '../errors/Error';

export default function Publish() {
  const [title, setTitle] = useState();
  const [articleText, setArticleText] = useState();
  const [tags, setTags] = useState();
  const { userData } = useContext(UserContext);
  const history = useHistory();

  // handle the publish article data
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent reloading
    try {
      // request to insert article
      const id = userData.user.id;
      const article = { id, title, articleText, tags };
      const publishRes = await Axios.post("http://localhost:5000/api/article/setArticle",
        article);
      history.push(`/user/${userData.user.username}`);
    } catch (err) {
      // err.response.data.msg && setError(err.response.data.msg);
      console.log(err)
    }
  }


  useEffect(() => {
    // restrict non-loggend in user to access home page
    if (!userData.user) history.push("/");
  }, [])
  return (

    <div className="publish">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title" onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Text</Form.Label>
          <Form.Control as="textarea" rows={6} onChange={(e) => setArticleText(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Tag</Form.Label>
          <Form.Control type="text" placeholder="tag1, tag2,..." onChange={(e) => setTags(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Publish
        </Button>
      </Form>

    </div>
  )
}
