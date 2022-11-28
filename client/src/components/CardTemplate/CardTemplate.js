import Card from 'react-bootstrap/Card';

/**
 * Kevin: This is just a temporary card template from Bootstrap. This probably won't be used in the final product.
 */
function CardTemplate(restaraunt) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={restaraunt.image} />
      <Card.Body>
        <Card.Title>{restaraunt.name}</Card.Title>
        <Card.Text>
          <p>{restaraunt.category}</p>
          <p>{restaraunt.rating} Stars</p>
          <p>{restaraunt.phone}</p>
          <p>{restaraunt.price}</p>
          <p>{restaraunt.address}</p>
          
        </Card.Text>
        <a href={restaraunt.link} target="_blank">Preview on Yelp</a>
      </Card.Body>
    </Card>
  );
}

export default CardTemplate;