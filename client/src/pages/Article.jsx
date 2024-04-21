
import Card from 'react-bootstrap/Card';

function Article({article}) {
  
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
      <div style={{ display: 'flex', flexDirection: 'row' }} >
        <Card.Title>Article Title :  </Card.Title> 
        <Card.Text>{article.title}</Card.Text>
        </div>
        <Card.Subtitle className="mb-2 text-muted">Article Description</Card.Subtitle>
        <Card.Text>
          {article.description}
        </Card.Text>
        <div style={{ display: 'flex', flexDirection: 'row' }} >
        <Card.Text> Creator :</Card.Text>
        <Card.Text>{article.creator.username}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Article;
