import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Card } from 'react-bootstrap';

export default function Home() {

  const [article, setArticle] = useState();
  let articleList = "";

  useEffect(() => {
    const getLoggedInUserArticles = async () => {
      const dataRes = await Axios.get("http://localhost:5000/api/article/getAllArticle");
      console.log(dataRes.data.user);
      if (dataRes.data.user.length > 0) {
        articleList = dataRes.data.user.map((article, index) => {
          return (
            <Card key={index}>
              <Card.Body>
                <Card.Title>{article.articleList.title}</Card.Title>
                <Card.Text>
                  {article.articleList.articleText}
                </Card.Text>
              </Card.Body>
            </Card>
          )
        })
      }
      setArticle(articleList)
    };
    getLoggedInUserArticles();
  }, [])

  return (
    <div className="userArticles">
      {article}
    </div>
  )
}

