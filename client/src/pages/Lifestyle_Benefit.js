import './Lifestyle_Benefit.css';
import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button'
import { createPath, Link } from "react-router-dom";
import TestCardTemplate from '../components/CardTemplate/TestCardTemplate';
function Lifestyle_Benefit() {
    //Based the structure off of what I expect JSON.stringify() would produce for the result

    // Yuke's Commit START
    const [benefits1, setBenefits1] = useState([]);
    var temp;
        const benefitList1 = benefits1.map((data) =>
        <TestCardTemplate {...data} />);
        // Janice: I changed this to use the TestCartTemplate.js for testing
        // const benefitList1 = benefits1.map((data) =>
        // <CardTemplate {...data} />);
        // const benefitList2 = benefits2.map((data) =>
        // <CardTemplate restaurant={data}/>);
    // Yuke's commit END
    // Uncommenting the function callc for this will cause the page to properly display the restaraunts, but result in a constant loop of API calls. 
    // Which is really bad since we have a limited number of API calls (around 3000?)
    useEffect(() =>{
        getYelpRecommendations();
    }, []);
    /**
     * sends the user location to the backend on app.post(/"Yelp_Recommendation")
     * userLocation - the location the user entered
     * returns a list of restaraunts
     */
    async function getYelpRecommendations(){
        //send location to backend
        console.log("uel");
        fetch('/Yelp_Recommendation', {
            method: 'POST',
            headers:{
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                location: "madison, wi" // user location that will be sent to backend in a JSON format
            }),
        })
        .then(res => res.json())    // takes response and saves into a JSON
        .then(restaraunts => {      // restaraunts will be the JSON sent from the backend
            console.log("benefits before: ");
            console.log(benefits1);
            temp = JSON.parse(JSON.stringify(restaraunts));   // save the JSON into an array of dictionaries
            console.log("benefits now: ");
            console.log(benefits1);
            setBenefits1(temp);    // uncomment this to preview 
        });
    }

    return (
        
        <div className="Benefits">
            <div className="pageHeader">
                <div className="header">
                    <div className="Benefit_Recommendation">
                        <br />
                    </div>
                </div>
                <div className="title">
                    <div class="title_Benefits">
                        Tailored Lifestyle Benefits
                    </div>
                </div>
                <div className="backButton">
                    <Link to="/SelectCard">
                        <Button variant='outline-primary'>Back</Button>
                    </Link>
                </div>
                <div className="homeButton">
                    <Link to="/">
                        <Button variant='outline-danger'>Home</Button>
                    </Link>
                </div>
            </div>

            <h1 className='msg'>Check out these amazing places where you can maximize your Savor Card benefits!</h1>
            <br />

            <div class="list_container">
                <div class="column_container">
                    <div class="title_container">
                        <div class="Restaurant_avatar"></div>
                        <div class="title_text">Earn 4% Cash Back on Restautant</div>
                    </div>

                    <div class="description_container">
                        <div class="title_text">Best lunch deals around you!</div>
                    </div>
                    <div className = 'benefitLayout'>{benefitList1}</div>
                </div>
                <div class="column_container">
                    <div class="title_container">
                        <div class="Entertainment_avatar"></div>
                        <div class="title_text">Earn 4% Cash Back on Entertainment</div>
                    </div>

                    <div class="description_container">
                        <div class="title_text">Looking for a nice night out? Here are the best places!</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Lifestyle_Benefit;
