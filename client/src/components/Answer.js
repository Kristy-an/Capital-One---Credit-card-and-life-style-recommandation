import './Answer.css';
import { useState, useEffect } from 'react';
function Answer(props) {
    const [highlight, setHighlight] = useState("answer-card")
    useEffect(() => {
      if (props.curr == props.text){

        setHighlight("answer-cardSelect")
      }
      else{
        setHighlight("answer-card")
      }
    })
    return (
      <div class = "layout_answer">
        <div class={highlight}>
          <label>
            <img class="answerImg" src={props.img} alt=""/>
            <div class= "descriptionLayout">{props.text}</div>
            <input class="inputAnswer" type="radio" name="choice" value={props.text} onClick={props.changeHandler} checked={props.text==props.curr} />
          </label>
        </div>
      </div>
    );
  }
  
  export default Answer;