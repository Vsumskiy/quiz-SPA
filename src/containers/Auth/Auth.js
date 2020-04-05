import React, { Component } from 'react'
import classes from './Auth.module.css'
import Button from '../../components/Ui/Button/Button'
import Input from '../../components/Ui/Input/Input'
import is from 'is_js'
import auth from '../../store/actions/auth'
import { connect } from 'react-redux'

class Auth extends Component {

  state={
    isFormValid: false,
    formsController:{
      email:{
        value: '',
        type: 'email',
        label: 'Пошта',
        errorMessage: 'Введіть коректну адресу пошти',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password:{
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введіть коректний пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  loginHandler = () => {
    this.props.auth(
      this.state.formsController.email.value,
      this.state.formsController.password.value,
      true
    )
  }

  registerHandler = () => {
    this.props.auth(
      this.state.formsController.email.value,
      this.state.formsController.password.value,
      false
    )
  }

  submitHandler = (event) => {
    event.preventDefault()
  }

  validateControl (value, validation) {
    if (!validation) {
    return  true
      };

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
      }

    if (validation.email) {
      isValid = is.email(value) && isValid;
      }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
      }

    return isValid
  }

  onChangeHandler (event, controlName) {
    const formsController = {...this.state.formsController}
    const control = {...formsController[controlName]}

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formsController[controlName] = control;

    let isFormValid = true;
    Object.keys(formsController).forEach((name) => {
      isFormValid = formsController[name].valid && isFormValid
    })
    this.setState({formsController, isFormValid})
  }

  renderInputs() {
    return Object.keys(this.state.formsController).map((controlName, index) => {
      const control = this.state.formsController[controlName]
      return (
        <Input
        key={controlName + index}
        type={control.type}
        value={control.value}
        valid={control.valid}
        label={control.label}
        errorMessage={control.errorMessage}
        touched={control.touched}
        shoulValidate={!!control.validation}
        onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() {
    return(
      <div className={classes.Auth}>
        <div>
          <h1>Авторизація</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}
            
            <Button 
            type="succes" 
            onClick={this.loginHandler}
            disabled={!this.state.isFormValid}
            >
              Увійти
            </Button>

            <Button 
            type="primary" 
            onClick={this.registerHandler}
            disabled={!this.state.isFormValid}
            >
             Зареєструватися
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth)