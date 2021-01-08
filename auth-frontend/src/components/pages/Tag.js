import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { Card } from 'react-bootstrap';

export default function Tag(props) {
    
  const [article, setArticle] = useState();
  const { userData } = useContext(UserContext);
  const history = useHistory(); //
  let articleList="";
  useEffect(() => {
    // get article by tags request
   
    const getArticles = async () => {
      const dataRes = await Axios.get("http://localhost:5000/api/article/getArticleByTag", {
          headers: { "tag": props.history.location.tagstate.tag }
        });
        console.log(dataRes.data.user);
      if(dataRes.data.user.length>0){
        articleList = dataRes.data.user.map((article,index)=>{
            // article card
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
      }else{
        articleList=<h1> Publish your first article</h1>;
      }
      setArticle(articleList)
    };
    getArticles();
    
  }, [])

  return (
    <div className="userArticles">
      {article}
    </div>
  )
}



