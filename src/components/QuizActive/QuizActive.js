import React from 'react';
import classes from './QuizActive.module.css';
import AnswersList from './AnswersList/AnswersList'

const activeQuiz = props => {
 return ( <div className={classes.QuizActive}>
    <p className={classes.Question}>
      <span>
        <strong>{props.answerNumber}.</strong>
        &nbsp;{props.question}
      </span>

 <small>{props.answerNumber} из {props.quiezLenghth}</small>
    </p>
    <AnswersList 
      answer={props.answer}
      onAnswerClick={props.onAnswerClick}
      state={props.state}
    />
  </div>
  )
}

export default activeQuiz