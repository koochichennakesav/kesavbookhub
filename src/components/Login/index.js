/* eslint-disable jsx-a11y/img-redundant-alt */
import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="username">
          Username*
        </label>
        <input
          type="name"
          id="username"
          value={username}
          onChange={this.onUsername}
          className="user-input"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="username">
          Password*
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={this.onPassword}
          className="user-input"
        />
      </>
    )
  }

  render() {
    const {showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="book-hub-login-bg-container">
        <div className="image-container">
          <img
            src="https://res.cloudinary.com/kesav-kuchi/image/upload/v1648060118/bookhubloginpage_cq1ndo.png"
            className="login-image"
            alt="website login"
          />
        </div>
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://res.cloudinary.com/kesav-kuchi/image/upload/v1648060130/bookhublogo_r7wcay.png"
            alt="login website logo"
            className="book-hub-logo"
          />
          {this.renderUsername()}
          {this.renderPassword()}
          {showError && <p className="error-message">{errorMsg}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
