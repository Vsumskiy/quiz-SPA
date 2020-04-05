import React, { Component } from 'react'
import classes from './QuizList.module.css'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchQuizes } from '../../store/actions/quiz'
import Loader from '../../components/Ui/Loader/Loader'

class QuizList extends Component {

  renderQuizes() {
    return this.props.quizes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
        )
      })
    }

  componentDidMount () {
    this.props.fetchQuizes()
  } 

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестів </h1>
          {this.props.loading && this.props.quizes !== 0
          ? <Loader />
          :<ul>
            {this.renderQuizes()}
          </ul>}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  }
}

function mapStateToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapDispatchToProps,mapStateToProps)(QuizList) 