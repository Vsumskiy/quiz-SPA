import React, {Component} from 'react';
import classes from './Quiz.module.css';
import QuizActive from '../../components/QuizActive/QuizActive'
import FinishedQuiz from '../../components/Finished/Finished'
import Loader from '../../components/Ui/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizById, quizAnswerClick, retryHandler } from '../../store/actions/quiz';

class Quiz extends Component {

  componentDidMount() {
   this.props.fetchQuizById(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.retryHandler()
  }

  render(){
    return(
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Дайте відповідь на усі питання</h1>
          { this.props.loading || !this.props.quiz
            ? <Loader />
            : this.props.isFinished ? 
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.props.retryHandler}
            />
            : <QuizActive 
                answer={this.props.quiz[this.props.aciveQuestion].answers}
                question={this.props.quiz[this.props.aciveQuestion].question} 
                onAnswerClick={this.props.quizAnswerClick} 
                quiezLenghth={this.props.quiz.length} 
                answerNumber={this.props.aciveQuestion + 1}
                state={this.props.answerState}
              />
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results, 
    isFinished: state.quiz.isFinished,
    aciveQuestion: state.quiz.aciveQuestion, 
    answerState: state.quiz.answerState, 
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: rightAnswerId => dispatch(quizAnswerClick(rightAnswerId)),
    retryHandler: () => dispatch(retryHandler())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz) 