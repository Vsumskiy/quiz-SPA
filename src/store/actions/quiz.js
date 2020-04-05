import axios from '../../axios/axios-quiz'
import {  FETCH_QUIZES_START, FETCH_QUIZES_SUCCES,
          FETCH_QUIZES_ERROR, FETCH_QUIZ_SUCCES,
          QUIZ_SET_STATE , QUIZ_NEXT_QUESTION, 
          FINISH_QUIZ, RETRY_QUIZ} from './actionsTypes'

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get('quizes.json')
      const quizes = []
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        })
      })

    dispatch(fetchQuizesSucces(quizes))
    } catch(e) {
     dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSucces(quizes) {
  return {
    type: FETCH_QUIZES_SUCCES,
    quizes
  }
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
}

export function fetchQuizById (quizId) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart())

    try {
      const response = await axios.get(`quizes/${quizId}.json`)
      const quiz = response.data
      dispatch(fetchQuizSucces(quiz))
    }
    catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizSucces(quiz) {
  return {
    type: FETCH_QUIZ_SUCCES,
    quiz
  }
}



export function quizSetState(answerState, results) {
  return {
    type:QUIZ_SET_STATE,
    answerState,results
  }
}

export function finishedQuiz () {
  return {
    type: FINISH_QUIZ
  }
}

export function quizNextQuestin (number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number
  }
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];

      if (state.answerState[key] === 'succes') return;
    }
    const results = state.results;
    const question = state.quiz[state.aciveQuestion]

    if (question.rightAnswerId === answerId) { 
      if (!results[question.id]) {
        results[question.id] = 'succes';
      }
      dispatch(quizSetState({[answerId]: 'succes'}, results))
  
      const timeout = window.setTimeout(()=>{ 
        if(isQuizFinish(state)){ 
          dispatch(finishedQuiz())
        } 
        else { 
          dispatch(quizNextQuestin(state.aciveQuestion + 1))
        }
        window.clearTimeout(timeout)
      },1000)
    } 
    else {
      results[question.id] = 'error'
      dispatch(quizSetState({[answerId]: 'error'}, results))
    }
  }
}

function isQuizFinish(state) {
  return state.aciveQuestion + 1 === state.quiz.length 
}

export function retryHandler () {
  return {
    type: RETRY_QUIZ
  }
}
