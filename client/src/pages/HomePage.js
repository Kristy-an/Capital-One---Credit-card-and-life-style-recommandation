import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import './HomePage.css'

function HomePage() {
  return (
    <body class = 'layout1'> 
      <div>
        {/* <h1>This is the Homepage</h1> */}
        <h1 class="title_HomePage">Capital One</h1>
        <h1 class="title_HomePage">Lifestyle Recommendation Engine</h1>
      </div>
      <div class ='layout2'> 
        <Link to="/Questionnaire">
        <div class = 'customer'> 
          <div class = 'image1'/>
          {/* <img class = 'image1' src = {newUser} alt=""/> */}
          <div class = 'customer-card-new'> Looking for a Card?
            <h6>Pick the best card for you!</h6>
          </div>
        </div></Link>
        <Link to="/SelectCard">
        <div class = 'customer'>
          <div class = 'image2'/>
          {/* <img class = 'image2' src = {cardHolder} alt=""/> */}
          <div class = 'customer-card-have'> Already own Card?
            <h6>Maximize my rewards!</h6>
          </div>
        </div></Link>
      </div>
    </body>
  );
}
export default HomePage;