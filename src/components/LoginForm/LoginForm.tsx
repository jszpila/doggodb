

import React, { useContext, useState } from 'react';
import AuthApi from '../../api/auth';
import { FiAlertTriangle } from "react-icons/fi";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";

import './LoginForm.scss';

export default function LoginForm() {
  const [name, setName] = useState("");
  const [isNameFieldValid, setIsNameFieldValid] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailFieldValid, setIsEmailFieldVvalid] = useState(false);
  const [formHasBeenSubmitted, setFormHasBeenSubmitted] = useState(false);
  const [shouldShowLoginError, setShouldShowLoginError] = useState(false);
  const context = useContext(AppContext);
  const navigate = useNavigate();

  // TODO: more thorough validations, sanitization, etc
  function isFormValid(): boolean {
    setIsNameFieldValid(name !== '');
    setIsEmailFieldVvalid(email !== '');

    return (name !== '' && email !== '');
  }

  async function handleSubmit(
    event: React.SyntheticEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    setFormHasBeenSubmitted(true);

    if (isFormValid()) {
      const loginSucceeded = await AuthApi.login({name, email});
      
      if (loginSucceeded) {
        setShouldShowLoginError(false);
        context.setUser({name, email});
        navigate('/doggos');
      } else {
        setShouldShowLoginError(true);
      }
    }
  }

  return (
    <section className="login-form__container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form__header">
          <h3 className="login-form__title">Login</h3>
        </div>
        {/* TODO: abstract to component(s) if similar pattern is used elsewhere */}
        {formHasBeenSubmitted && (
          <div className="login-form__messages">
            <ul className="login-form__messages-list">
              {!isNameFieldValid && (
                <li className="login-form__message">
                  <FiAlertTriangle />
                  <span>Name is required</span>
                </li>
              )}
              {!isEmailFieldValid && (
                <li className="login-form__message">
                  <FiAlertTriangle />
                  <span>Email is required</span>
                </li>
              )}
              {shouldShowLoginError && (
                <li className="login-form__message">
                  <FiAlertTriangle />
                  <span>Error logging in - sorry!</span>
                </li>
              )}
            </ul>
          </div>
        )}
        <div className="login-form__body">
          <ul className="login-form__fields">
            <li className="login-form__field">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                type="text"
                placeholder="Name"
                className={`login-form__input ${!isNameFieldValid && formHasBeenSubmitted ? "login-form__input--invalid" : ""}`}
                minLength={3}
                maxLength={256}
              />
            </li>
            <li className="login-form__field">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                className={`login-form__input ${!isEmailFieldValid && formHasBeenSubmitted ? "login-form__input--invalid" : ""}`}
                placeholder="Email"
                minLength={7}
                maxLength={256}
              />
            </li>
          </ul>
        </div>
        <div className="login-form__footer">
          <button className="btn--primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}