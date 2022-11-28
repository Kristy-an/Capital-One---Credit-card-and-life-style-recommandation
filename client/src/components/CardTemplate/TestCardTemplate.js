/*
    Janice:
    This js file is to test the card template for Tailored Lifestyle Benefits
    I refered Kevin's CardTemplate.js
*/
import './TestCardTemplate.css';

function TestCardTemplate(restaraunt) {
  return (
    <div class ='benefitCard_layout'>
        <div class = 'benefitCard_description'>
            <h1>{restaraunt.name}</h1>
            <p>{restaraunt.rating} Stars</p>
            <p>{restaraunt.category}</p>
            <p>{restaraunt.phone}</p>
            <p>{restaraunt.price}</p>
            <p>{restaraunt.address}</p>
            <p href={restaraunt.link} target="_blank">Preview on Yelp</p>
        </div>
        <img class='benefitCard_img' src={restaraunt.image} alt=""/>
    </div>
  );
}

export default TestCardTemplate;