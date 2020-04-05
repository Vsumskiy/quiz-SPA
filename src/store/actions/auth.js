import axios from 'axios'
import { AUTH_SUCCES, AUTH_LOGOUT } from './actionsTypes'

export default function auth(email, password, isLogin) {
  
  return async dispath => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    let url  = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_zHkAtBsnaT4xpHX21rJRDe7fFDBfOO0'
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB_zHkAtBsnaT4xpHX21rJRDe7fFDBfOO0'
    }
    const response = await axios.post(url,authData)
    const data = response.data
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userID', data.localId)
    localStorage.setItem('expirationDate', expirationDate)
    
    dispath(authSucces(data.idToken))
    dispath(autoLogOut(data.expiresIn))
  }
}

export function authSucces (token) {
  return {
    type: AUTH_SUCCES,
    token
  }
}

export function autoLogOut (time) {
  return dispath => {
    setTimeout(() => {
      dispath(logout())
    }, time * 1000)
  }
}

export function logout () {
  localStorage.removeItem('token')
  localStorage.removeItem('userID')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT,
  }
}

export function autoLogin() {
  return dispath => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispath(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispath(logout())
      } else {
        dispath(authSucces(token))
        dispath(autoLogOut((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}