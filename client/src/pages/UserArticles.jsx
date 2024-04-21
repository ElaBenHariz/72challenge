import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteArticle, getMyArticles } from '../redux/ArticleSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Article from './Article';
import BasicExample from './Navi';
import AddArticle from './AddArticle';
import Card from 'react-bootstrap/Card';

function UserArticles() {
  const { myarticles } = useSelector(state => state.articles);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getMyArticles(user._id));
    }
  }, [dispatch, user]);

  return (
    <div>
      <BasicExample />
      <h1>My articles</h1>
      <div>
        <AddArticle />
        {user ? (
          myarticles && myarticles.map((article) => (
            <Card style={{ width: '18rem' }} key={article._id}>
              <Card.Body>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Card.Title>Article Title: </Card.Title>
                  <Card.Text>{article.title}</Card.Text>
                </div>
                <Card.Subtitle className="mb-2 text-muted">Article Description</Card.Subtitle>
                <Card.Text>
                  {article.description}
                </Card.Text>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Card.Text>Creator: {article.creator.username}</Card.Text>
                  <button onClick={() => { dispatch(deleteArticle(article._id));window.location.reload() }}>Delete article</button>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div>
            <h3>No articles found for you</h3>
            <p>
              <Link to="/register">
                Register here to add articles
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserArticles;
