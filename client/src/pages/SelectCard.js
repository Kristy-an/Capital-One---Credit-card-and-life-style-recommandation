import React from 'react';
import './SelectCard.css'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
function SelectCard() {
    return (
        <div className="creditCardSelection">
            <div className="pageHeader">
                <div className="header">
                    <div className="cardRecommendation">
                        <br />
                    </div>
                </div>
                <div className="title">
                    <div class= "title_selectCard">
                        Tailored Lifestyle Benefits
                    </div>
                </div>
                <div className="backButton">
                    <Link to="/">
                        <Button variant='outline-primary'>Back</Button>
                    </Link>
                </div>
                <div className="homeButton">
                    <Link to="/">
                        <Button variant='outline-danger'>Home</Button>
                    </Link>
                </div>
            </div>

            <h1 className='msg'>Select the card you want to maximize rewards!</h1>
            <br />

            <div class = "cards_container">
            <ul> <li> <Link to ="/Lifestyle_Benefit">
                <div class = "card_button">
                    <div class = "card_Quicksilver"/>
                    Quicksilver
                </div></Link></li>
                
                <li> <Link to ="/Lifestyle_Benefit">
                <div class = "card_button">
                    <div class = "card_savor"/>
                    savor
                </div></Link></li>

                <li><Link to ="/Lifestyle_Benefit">
                <div class = "card_button">
                    <div class = "card_venture"/>
                    Quicksilver
                </div></Link></li>

                <li><Link to ="/Lifestyle_Benefit">
                <div class = "card_button">
                    <div class = "card_ventureX"/>
                    Quicksilver
                </div></Link></li> </ul>
            </div>

        </div>
    )
}
export default SelectCard;