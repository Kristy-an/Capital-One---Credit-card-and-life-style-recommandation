const express = require("express");
const PORT = process.env.PORT || 3001;  // This is the port that the backend will run on
const app = express();

// This is for importing the Yelp Fusiom API
'use strict';
const yelp = require('yelp-fusion');
const client = yelp.client('vVs7u_YmjmjjtT6XjQp7I2XTerEpsyC23767ojkll8eL61K0VxbmucTROjGQng4f-Pj_b6yF6G0aUQbJ4Cg5FS44to7prIGbeItKyX6CAaupWjRiDEuD5_giDc5JY3Yx');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * This function is to test a GET request
 * go to http://localhost:3001/status to check if this GET request works
 * This can be removed tbh
 */
app.get("/status", (req, res) => {
  res.json({ message: "ONLINE" });
});

// Server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

/**
 * POST Request for user questionnaire
 * A JSON of the user's questionaire is sent to here
 * Returns the top two recommended cards based on the questionaire
 * req - request object from the frontend (questinenaire JSON)
 * res - response object to the frontend (top two recommended cards)v
 */
app.post("/Questionnaire", (req, res) => {
  console.log("POST request received for /Questionnaire");
  var userResults = req.body; // userResults is a JSON of the user's questionnaire
  console.log(userResults);
  
  /**
   * Card Recommendation Algorithm / Scoring System
   * Kevin: How this works: 
   * Object variables for each card, containg the name, score, link, and description that will be sent to the frontend.
   * Each card will start with zero points, and then the points will be added based on the user's survey answers.
   * At the end, sort the cards by their score. If the top two cards are Venture cards, then the second card will be the swapped with the third.
   * Then sends the top 2 cards back to the frontend (QuestionWrapper.js). 
  */
  var ventureX = {
    name: "VentureX", 
    score: 0,
    link: "https://www.capitalone.com/credit-cards/venture-x/",
    description: `Earn 75,000 bonus miles once you spend $4,000 on purchases within the first 3 months from account opening.
    Get 10,000 bonus miles (equal to $100 towards travel) every year, starting on your first anniversary. 
    Receive up to $300 back as statement credits for bookings through Capital One Travel, where you’ll get our best prices on thousands of options. 
    Receive up to a $100 credit on Global Entry or TSA PreCheck®.`
  };
  var venture = {
      name: "Venture",
    score: 0,
    link: "https://www.capitalone.com/credit-cards/venture/",
    description: "Earn unlimited 2 miles per dollar on every purchase. Earn unlimited 5 miles per dollar on hotels and rental cars booked through Capital One Travel."
  };
  var savor = {
    name: "Savor", 
    score: 0,
    link: "https://www.capitalone.com/credit-cards/savor-dining-rewards/",
    description: "Earn unlimited 4% cash back on dining, entertainment & popular streaming services, plus 3% at grocery stores."
  };
  var quickSilver = {
    name: "Quicksilver",
    score: 0,
    link: "https://www.capitalone.com/credit-cards/quicksilver/",
    description: "Earn unlimited 1.5% cash back on every purchase, every day. Plus, a $200 Cash Bonus."
  };
 
  // Question 1 - Which best describes you?
  switch(userResults.fees) {
    case("I don't mind paying a fee if the rewards are worth it!"):
      ventureX.score += 1;
      break;
    case("Small fee? Show me the benefits and I'm in!"):
      venture.score += 1;
      savor.score += 1;
      break;
    case("I'm annual fee averse!"):
      quickSilver.score += 1;
      break;
  }
  // Question 2 - What kind of benefit is important to you for the new credit card?
  switch(userResults.importantBenefits) {
    case("High fixed rewards rates"):
      ventureX.score += 1;
      break;
    case("Flexible rewards redemption"):
      venture.score += 1;
      ventureX.score += 1;
      break;
    case("Cash back"):
      savor.score += 1;
      quickSilver.score += 1;
      break;
    
  }
  // Question 3 - What best describes your preferences?
  switch(userResults.preference) {
    case("I prefer to use different card for different situations to maximize my rewards"):
      ventureX.score += 1;
      venture.score += 1;
      savor.score += 1; 
      break;
    case("I hate using multiple cards, one should be enough!"):
      quickSilver.score += 1;
      break;
  }
  // Question 4 - When getting a new credit card, which one are you most interested in?
  switch(userResults.interests) {
    case("Miles, upgrades, and all the comfort my credit card provider can offer!"):
      ventureX.score += 1;
      break;
    case("Miles, miles and more miles!"):
      venture.score += 1;
      break;
    case("Lots of cash back for my favorite purchases"):
      savor.score += 1;
      break;
    case("Genereous sign-up bonus and a flat reward rate"):
      quickSilver.score += 1;
      break;
  }
  // Question 5 - What best describes your lifestyle?
  switch(userResults.lifestyle) {
    case("I haven't traveled everywhere, but it's on my bucket list"):
      ventureX.score += 1;
      venture.score += 1;
      break;
    case("I'm all in for dining out and/or fun nights out!"):
      savor.score += 1;
      break;
    case("It like to try a little bit of everything"):
      quickSilver.score += 1;
      break;
  }
  // Question 6 - How often do you travel?
  switch(userResults.travelFrequency) {
    case("Every month (12+ times a year)"):
      ventureX.score += 1;
      break;
    case("Almost every month (8+ times a year)"):
      venture.score += 1;
      break;
    case("A couple times a year"):
      savor.score += 1;
      quickSilver.score += 1;
      break;
  }
  // Question 7 - Where do you usually go for groceries?
  switch(userResults.groceryFrequency) {
    case("It depends, I spend a lot of away from home and I'm always short on time"):
      ventureX.score += 1;
      venture.score += 1;
      break;
    case("Smaller or local supermarkets (Whole Foods, Trader Joe's, etc)"):
      savor.score += 1;
      break;
    case("Superstores (Walmart, Costco, Target)"):
      savor.score += 1;
      quickSilver.score += 1;
      break;
  }
  // Question 8 - How often do you eat out?
  switch(userResults.eatingOutFrequency) {
    case("A couple times weekly"):
      savor.score += 1;
      break;
    case("Few times a month"):
      quickSilver.score += 1;
      break;
  }
  // Question 9 - How often do you rent cars?
  switch(userResults.carRentalFrequency) {
    case("Frequently (10+ times a year)"):
      ventureX.score += 1;
      break;
    case("Often (6+ times a year)"):
      venture.score += 1;
      break;
    case("Rarely"):
      savor.score += 1;
      quickSilver.score += 1;
      break;
  }

  // Filter Questions
  // Question 10 - What is your credit score level?
  switch(userResults.creditScore) {
    case("Excellent (780+)"):
      break;
    case("Very Good (700 - 779)"):
      break;
    // Less than 650 is too low for VentureX
    case("Good (650 - 699)"):
      ventureX.score = -1;
      break;
    case("Fair (Below 650)"):
      ventureX.score = -1;
      break;
  }
  // Question 11 - Household Income
  // Kevin: TBH I feel like we could remove this question since there's no card that has a minimum income requirement
  switch(userResults.householdIncome) {
    case("$100K+"):
      break;
    case("$80K+"):
      break;
    case("$60K+"):
      break;
    // Less than 60K is maybe too low for VentureX? 
    case("$40K+"):
      ventureX.score = -1;
      break;
    case("Less than $40k"):
      ventureX.score = -1;
      break;
  }

  // Gets two cards with the highest scores
  cardArr = [ventureX, venture, savor, quickSilver];
  // Sorts the array by score from highest to lowest
  cardArr = cardArr.sort((a, b) => b.score - a.score );
  //console.log(cardArr); // Prints the array of cards sorted by score

  // If the top two cards are venture cards, only show the top one to give variety and swaps with the third card
  if ((cardArr[0].name == "Venture" && cardArr[1].name == "VentureX") || cardArr[0].name == "VentureX" && cardArr[1].name == "Venture") {
    console.log("Duplicate Venture cards, swapping " + cardArr[1].name + " for " + cardArr[2].name);
    cardArr[1] = cardArr[2];
    
  }

  // Sets the response to the top two cards to the FE (QuestionWrapper.js)
  res.json({ 
    firstRecommendation: cardArr[0].name,
    firstLink: cardArr[0].link,
    firstDescription: cardArr[0].description,
    secondRecommendation: cardArr[1].name,
    secondLink: cardArr[1].link,
    secondDescription: cardArr[1].description
  });
});




/**
 * POST Request for returning restaraunts based on the user's location via the Yelp API
 * Kevin: How this works:
 * User's location is attached to this post request. The location is then used to send a request to the Yelp API.
 * The Yelp API returns a list of restaraunts based on the location. We save only the first 10 for now. 
 * Only certain information is saved for each restaraunt. The information is then sent back to the front end.
 * References to use
 * https://www.yelp.com/developers/documentation/v3/business_search
 * https://github.com/Yelp/yelp-fusion
 * req - request object (user's location) that is sent from the frontend
 * res - response object (list of restaurants) to be sent to the frontend
 */
app.post("/Yelp_Recommendation", (req, res) => {
  console.log("POST request received for Recommendation");
  var userLocation = req.body.location; // the user's location that is sent from the frontend (i.e. "madison, wi", "nyc")
  console.log("Submitted Location: " + userLocation);

  // Yelp API call
  // reference - https://www.yelp.com/developers/documentation/v3/business_search
  client.search({
    type: "restaurant",
    location: userLocation,
    }).then(response => {
      var restaraunts = []; // array of restaurants to be turned into a JSON object and sent to the frontend
      
      // gets 10 restaraunts from yelp api
      for (var i = 0; i < 2; i++) {
        // only saves selected data from yelp api into a new object
        var restaraunt = new Object();
        restaraunt.name = response.jsonBody.businesses[i].name;
        restaraunt.rating = response.jsonBody.businesses[i].rating;
        restaraunt.category = response.jsonBody.businesses[i].categories[0].alias;  // https://www.yelp.com/developers/documentation/v3/all_category_list
        restaraunt.phone = response.jsonBody.businesses[i].display_phone;
        restaraunt.address = response.jsonBody.businesses[i].location.address1;
        restaraunt.url = response.jsonBody.businesses[i].url;
        restaraunt.price = response.jsonBody.businesses[i].price;
        restaraunt.image = response.jsonBody.businesses[i].image_url;
        restaraunts.push(restaraunt); // adds restaraunt to array
      }

      //console.log("Restaraunts at '" + userLocation + "'");
      //console.log(restaraunts);
      res.json(restaraunts);  // Sets response to the JSON of restaraunts
    }).catch(e => {
      res.json({message: "ERROR 400 - invalid location"});  // Sets response to an error message
  });
});