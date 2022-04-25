import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Validate, Error } from "../Functions/register";
import { registerUser } from "../API/SlackAPI";

import useInput from "../Hooks/useInput";
import useRequest from "../Hooks/useRequest";

const Register = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);

  const {
    value: email,
    valid: emailValid,
    error: emailError,
    onChange: emailChange,
    onCheck: emailCheck,
    setValid: setEmailValid,
    setError: setEmailError,
  } = useInput(Validate.email, Error.email);

  const {
    value: password,
    valid: passwordValid,
    error: passwordError,
    onChange: passwordChange,
    onCheck: passwordCheck,
    // setError: setPasswordError,
  } = useInput(Validate.password, Error.password);

  const {
    value: confirm,
    valid: confirmValid,
    error: confirmError,
    onChange: confirmChange,
    onCheck: confirmCheck,
    // setError: setConfirmError,
  } = useInput(Validate.confirm, Error.confirm, {
    status: passwordValid,
    input: password,
  });

  const { loading, sendRequest: register } = useRequest(registerUser);
  const formValid = emailValid && passwordValid && confirmValid;
  const dispatch = useDispatch();
  const updateFnc = { setEmailValid, setEmailError, dispatch };
  const config = { body: { email, password, password_confirmation: confirm } };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formValid) {
      console.log("Form is Valid", config.body);
      // let body = { email, password, password_confirmation: confirm };
      register(config, updateFnc);
    } else {
      emailCheck();
      passwordCheck();
      confirmCheck();
    }
  };

  return (
    <div>
      Create an Account
      {/* <Link to="/login">Already registered</Link> */}
      <form onSubmit={handleRegister}>
        <input
          id="register-email"
          type="email"
          className={emailValid ? "valid" : ""}
          placeholder="Email"
          onChange={emailChange}
        />
        {emailValid ? <span>(Valid)</span> : <span>{emailError}</span>}
        <br />
        <input
          id="register-password"
          type={passwordShow ? "text" : "password"}
          className={passwordValid ? "valid" : ""}
          placeholder="Password"
          onChange={passwordChange}
        />
        <button
          type="button"
          onClick={() => {
            setPasswordShow((state) => !state);
          }}
        >
          Toggle
        </button>
        {passwordValid ? <span>(Valid)</span> : <span>{passwordError}</span>}
        <br />
        <input
          id="register-confirmPW"
          type={confirmShow ? "text" : "password"}
          className={confirmValid ? "valid" : ""}
          placeholder="Confirm Password"
          disabled={!passwordValid}
          onChange={confirmChange}
        />
        <button
          type="button"
          disabled={!passwordValid}
          onClick={() => {
            setConfirmShow((state) => !state);
          }}
        >
          Toggle
        </button>
        {confirmValid ? <span>(Valid)</span> : <span>{confirmError}</span>}
        <br />
        <button type="submit">{loading ? "Loading..." : "Register"}</button>
      </form>
      <div>
        Already registered? <Link to="/login">Login</Link>{" "}
      </div>
    </div>
  );
};

export default Register;
