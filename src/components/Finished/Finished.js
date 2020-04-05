import React from 'react'
import classes from './Finished.module.css'
import Button from '../Ui/Button/Button'
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {
  const succesCount = Object.keys(props.results).reduce((acamulator, key)=>{
    if (props.results[key] === 'succes') {
      acamulator++
    }
    return acamulator;
  }, 0)

  return ( 
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index)=> {
         const cls = [
          'fa',
          props.results[quizItem.id] === 'error' ? 'fa-times' :'fa-check',
          classes[props.results[quizItem.id]]
          ]
            return (
              <li key={index}>
               <strong>{index + 1 }</strong>.&nbsp;
               {quizItem.question}
                <i className={cls.join(' ')} />
              </li>
             )
         })}
          </ul>
        <p>{succesCount} iz {props.quiz.length}</p>
          <div>
            <Button onClick={props.onRetry} type='primary'> Повторити </Button>
            <Link to='/'>
              <Button  type='succes'> Повернутись до списку тестів </Button>
            </Link>
          </div>
        </div>
  )
}

export default FinishedQuiz