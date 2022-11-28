import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CardTemplate from '../components/CardTemplate/CardTemplate';

/**
 * This page is a demo for testing the Yelp API
 */
function API_Test() {
    var restarauntList;
    var resList = [];
    const [title, setTitle] = useState('Enter Your Location');

    var userLocation = "";

    /**
     * Track user text input change in the text box and saves
     * @param {*} event 
     */
    function handleChange(event){
        userLocation = event.target.value;
    }

    /**
     * Updates the title on the webpage
     */
    async function updateTitle(){
        setTitle("Restaraunts Near " + userLocation);
    }


    /**
     * This function does not work
     * print cardTemplate objects for each restaraunt
     * @returns 
     */
    async function printRestaraunts(){
        await sendLocation();

        //console.log("this should print after sendLocation() is finished");
        //console.log("restarauntList: "+restarauntList);

        //for (let i = 0; i < restarauntList.length; i++){
          //  console.log(restarauntList[i]);
            //resList.push(<CardTemplate restaraunt={restarauntList[i]} />);
        //}
        //restarauntList.forEach((rest, index) => {
        //    resList.push(<p>{rest.name}</p>)
        //});
        return <h1>help me</h1>
    }

    /**
     * sends the user location to the backend on app.post(/"Yelp_Recommendation")
     * userLocation - the location the user entered
     * returns a list of restaraunts
     */
    async function sendLocation(){
        console.log("user location: " + userLocation);
        //send location to backend
        fetch('/Recommendation', {
            method: 'POST',
            headers:{
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                location: userLocation, // user location that will be sent to backend in a JSON format
            }),
        })
        .then(res => res.json())    // takes response and saves into a JSON
        .then(restaraunts => {      // restaraunts will be the JSON sent from the backend
            console.log("POST REQUEST FINISHED");
            console.log(restaraunts);
            restarauntList = restaraunts;   // save the JSON into a variable
            return 1;   // idk if this line is needed
        });
    }

    return (
        <body> 
            <div className="text-center container">
                <h1>Yelp Fusion API Testing</h1>

                {/* Text Bar */}
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Enter Location"
                        aria-label="Enter Location"
                        aria-describedby="basic-addon1"
                        onChange={handleChange}
                    />
                </InputGroup>

                {/* Submit Button which calls functions */}
                <Button type="submit" variant="primary" onClick={
                    async () => {
                        updateTitle();
                        //sendLocation();
                        printRestaraunts();
                    }
                }>Send to backend</Button>{' '}  
                
                <h3 className="mt-4">{title}</h3>

                

                {/*Example of a card with static info
                * The goal here is to basically dynamically load each card for each restaraunt
                */}
                <CardTemplate 
                    image = "https://s3-media4.fl.yelpcdn.com/bphoto/-RPUCZAauPxU0M2GToOO1w/o.jpg"
                    name="Graze"
                    category = "newamerican"
                    phone = "(608) 251-2700"
                    rating = "4"
                    price = "$$"
                    address = "1 S Pinckney St, Madison, WI 53703"
                    link = "https://www.yelp.com/biz/graze-madison?adjust_creative=8it3Mi6j_VmbU8ZMS8G6eg"
                />
                
            </div>
        </body>
    );
}

export default API_Test;
