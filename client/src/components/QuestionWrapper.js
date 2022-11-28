import React, { useEffect } from 'react';
import Answer from './Answer'
import {useState} from 'react';
import { render } from 'react-dom';
import { Link } from "react-router-dom";
import Recommendation from '../pages/Recommendation';
import Button from 'react-bootstrap/Button'
import './QuestionWrapper.css'
import QStorage from './QStorage.js'
import AStorage from './AStorage.js'

function QuestionWrapper() {
  const initQuestion = QStorage.call(QStorage)[0]
  const initAnswers = AStorage.call(AStorage)[0]
  const [userData, setUserData] = useState([])
  const [currAnswer, setCurrAnswer] = useState("")
  const [numQuestion, setNumQuestion] = useState(1)
  const [questions, setQuestion] = useState(initQuestion)
  const [answers, setAnswers] = useState(initAnswers)
  const [finalQuestion, setFinalQuestion] = useState(false)
  const question = printQuestion(questions)

  // Card 1 & 2 into sent to be saved and sent to app.post/Questionnaire
  const [card1, setCard1] = useState('');  // this saves the first recommended card's name
  const [card1Link, setCard1Link] = useState('');  // this saves the first recommended card's link
  const [card1Desc, setCard1Desc] = useState('');  // this saves the first recommended card's description
  const [card2, setCard2] = useState('');  // this saves the second card's name
  const [card2Link, setCard2Link] = useState('');  // this saves the second card's link
  const [card2Desc, setCard2Desc] = useState('');  // this saves the second card's description

  const [questionaireVis, setQuestionaireVisiblity] = React.useState(true);  // visibility of the questionaire - default: true
  const [recVis, setRecVisibility] = React.useState(false); // visiblity of recommentation page - default: false

  /**
   * This function is used to hide the main questionaire and show the recommendation page in the same link
   * @param {} e - event
   */
  async function click(e) {
    e.preventDefault();
    setRecVisibility(true);
    setQuestionaireVisiblity(false);
  }
  useEffect(() =>{
    const data = JSON.parse(localStorage.getItem('userData'))
    const questionNumber = JSON.parse(localStorage.getItem('question'))
    console.log(data)
    console.log(questionNumber)
    if(data != null && questionNumber != null){
      if(questionNumber >= 11){
        setFinalQuestion(true)
        setNumQuestion(11)
        setQuestion(QStorage.call(QStorage)[10])
        setAnswers(AStorage.call(AStorage)[10])
        setUserData(data)
      }
        
      else{
        setUserData(data)
        setNumQuestion(questionNumber)
        setQuestion(QStorage.call(QStorage)[questionNumber - 1])
        setAnswers(AStorage.call(AStorage)[questionNumber - 1])
        setCurrAnswer("")
      }
    }
  }, [])

  useEffect(() =>{
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData])
  useEffect(()=>{
    localStorage.setItem('question',  JSON.stringify(numQuestion));
  }, [numQuestion])
  function printQuestion(question){
    return(question);
  }
  async function updateQuestion(){
    if (numQuestion != 11){
    setNumQuestion(numQuestion + 1)
    setQuestion(QStorage.call(QStorage)[numQuestion])
    setAnswers(AStorage.call(AStorage)[numQuestion])
  
    if(numQuestion === 10){
      setFinalQuestion(true)
    }
    setUserData(userData.concat(currAnswer))
    console.log(userData.concat(currAnswer))
    setCurrAnswer("")
    }
  }
  //function for back button
  async function recallQuestion(){
    if (numQuestion != 1){
    setNumQuestion(numQuestion - 1)
    setQuestion(QStorage.call(QStorage)[numQuestion -2])
    setAnswers(AStorage.call(AStorage)[numQuestion -2])
    setUserData(userData.slice(0,-1))
    setFinalQuestion(false)
    }
  }

  function recordUserData(event){
    setCurrAnswer(event.target.value)
  }

  /**
   * Sends user's questinnaire results to the backend (app.post('/Questionnaire'))
   * Saves the app.post's response (the recommended cards) to the variables.
   * The variables will be used later to display the recommended cards.
   */
  async function sendToBackend(){
    fetch('/Questionnaire',{
      method: 'POST',
      headers:{
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
      },
      // sends token and review form to backend
      body:JSON.stringify({
          fees: userData[0],
          importantBenefits: userData[1],
          preference: userData[2],
          interests: userData[3],
          lifestyle: userData[4],
          travelFrequency: userData[5],
          groceryFrequency: userData[6],
          eatingOutFrequency: userData[7],
          carRentalFrequency: userData[8],
          creditScore: userData[9],
          householdIncome: currAnswer,  // for some reason, userData[10] comes off as undefined, so I just used currAnswer instead to send to the backend
      }),
    }).then(res => res.json())  // get's response from the backend and saves it to the variable
      .then(recommendedCards => {
        
        console.log("POST REQUEST FINISHED. SETTING RECOMMENDED CARDS");
        setCard1(recommendedCards.firstRecommendation);
        setCard1Link(recommendedCards.firstLink);
        setCard1Desc(recommendedCards.firstDescription);
        setCard2(recommendedCards.secondRecommendation);
        setCard2Link(recommendedCards.secondLink);
        setCard2Desc(recommendedCards.secondDescription);

    });
  }
  const answerList = answers.map((answer) =>
  <Answer img={answer[0]} text={answer[1]} changeHandler={recordUserData} curr={currAnswer}/>
)
  return (
    <div class ='layout_Wrapper'>
      {/* Displays the questinnaire while questionaireVis is true */}
      {questionaireVis &&
        <div class="layout_Wrapper">
          <h2 class = 'questionBox'>{question}</h2>
          <div class = "buttons_container">
            <Button variant='outline-primary' onClick={recallQuestion}>← Back</Button>
            {
              !finalQuestion && <Button variant = 'outline-primary' onClick={updateQuestion}>Confirm →</Button>
            }
            {finalQuestion &&
            /** 
             * Kevin: I swapped the Link tag into a Button tag.
             * What happens now is that clicking on the button will hide the questionnaire, and instead show the recommendation page. 
             * Both pages are loaded at the same time, but only one is visible at a time.
             * I couldn't figure out how to send data/parameters while loading to a new page. So I just decided to keep things in the same page for now.
             */ 
              <Button variant='outline-primary'
              onClick={ 
                async (event) => {
                  updateQuestion();
                  sendToBackend();
                  click(event);
                }
              }>Confirm →</Button>
            }  
          </div>
          <div class = 'answerLayout' className='answers'>{answerList}</div>
          <Link to="/">
          <Button variant='outline-danger'>Home</Button>{' '}
          </Link>
      </div>
      }
      
      {/* This is the recommendation component. This is loaded but initially hidden until the questionnaire is finished and recVis is set to true */}
      <div>
        {recVis && (
        <Recommendation
          // variables will be passed to the recommendation component.
          firstRec = {card1}
          firstLink = {card1Link}
          firstDesc = {card1Desc}
          secondRec = {card2}
          secondLink = {card2Link}
          secondDesc = {card2Desc}
        />
        )}
      </div>
    </div>
    
  );
}

export default QuestionWrapper;