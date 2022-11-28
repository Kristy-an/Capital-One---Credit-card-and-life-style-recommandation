import './Questionnaire_Welcome_Page.css';
import {Button}  from 'react-bootstrap';
import React from 'react';
import QuestionWrapper from "../components/QuestionWrapper"
import { Link } from "react-router-dom";
import './Questionnaire.css'
function Questionnaire() {
  return (
    <div >
      <h1 class = 'title_QuestionPage'>Capital One Credit Card Recommendation</h1>
      <div>
      {/* <Link to="/">
          <Button variant='outline-danger'>Home</Button>{' '}
        </Link> */} {/* Moved this to the QuestionWrapper.js*/}
        <QuestionWrapper/>
      </div>
    </div>
  );
}

export default Questionnaire;