import React from 'react';
import './Recommendation.css';
import savor from '../images/savor.jpg';
import venture from '../images/venture.jpg';
import ventureX from '../images/venturex.jpg';
import quicksilver from '../images/quicksilver.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * This component is used to display the recommendation page
 * This will be loaded onto the same /Questionnaire page, instead of linking to a new page(ie. /Recommendation)
 * @param {*} cards - input of the top two recommended cards sent from the frontend (QuestionWrapper.js)
 */
function Recommendation(cards) {
  let firstCard = cards.firstRec.toLowerCase(); // top recommended card
  let secondCard = cards.secondRec.toLowerCase(); // second best recommended card
  let firstCardImg; // image of the top recommended card
  let secondCardImg; // image of the second best recommended card

  // Kevin: idk I feel like there could be a cleaner approach but it works
  // this is used to dynamically load the right card images
  // Get image for the top card
  switch(firstCard){
    case "savor":
      firstCardImg = savor;
      break;
    case "venture":
      firstCardImg = venture;
      break;
    case "venturex":
      firstCardImg = ventureX;
      break;
    case "quicksilver":
      firstCardImg = quicksilver;
      break;
  }
  // Gets the image for the second top card
  switch(secondCard){
    case "savor":
      secondCardImg = savor;
      break;
    case "venture":
      secondCardImg = venture;
      break;
    case "venturex":
      secondCardImg = ventureX;
      break;
    case "quicksilver":
      secondCardImg = quicksilver;
      break;
  }

  return (
    // style={{font:"unset"}} to revert to bootstrap font
    <div className="justify-content-center text-center">
      <h2 className="mb-5 mt-5">Below are the credit card recommendations for you!</h2>
      <div className="container">
        <div className="row">

          {/* Top recommended card */}
          <div className="col">
            <div className='mb-3'> Best choice for you: </div>
            <div></div>
            <img className="cardImg card" style={{
              padding: "0", border: "0px solid", width: "288px", height: "181.14px"}} src={firstCardImg} alt={cards.firstRec + " card"}></img>
            <a href={cards.firstLink} target="/Lifestyle_Benefit"><h3 className="mt-3 cardTitle">{cards.firstRec} Rewards</h3></a>
            <p className="mt-2">{cards.firstDesc}</p>
          </div>

          {/* Second best recommended card */}
          <div className="col">
            <div className='mb-3'> Also consider this: </div>
            <img className="cardImg card" style={{
              padding: "0", border: "0px solid", width: "288px", height: "181.14px"}} src={secondCardImg} alt={cards.secondRec + " card"}></img>
            <a href={cards.secondLink} target="/Lifestyle_Benefit"><h3 className="mt-3 cardTitle">{cards.secondRec} Rewards</h3></a>
            <p className="mt-2">{cards.secondDesc}</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Recommendation;
