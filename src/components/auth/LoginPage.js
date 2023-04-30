import { useState } from "react";

import Button from "../shared/Button";
import FormField from "../shared/FormField";
import { login } from "./service";

import "./LoginPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context";
import { useRef } from "react";
import { useEffect } from "react";

function LoginPage() {
  const { onLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const renders = useRef(0);

  useEffect(() => {
    renders.current++;
    console.log(renders.current, " times rendered");
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const resetError = () => {
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    resetError();
    setIsLoading(true);
    try {
      await login(credentials, checkboxChecked);
      setIsLoading(false);
      // Logged in
      onLogin();
      // Redirect to pathname
      const to = location.state?.from?.pathname || "/";
      navigate(to);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const [checkboxChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checkboxChecked);
  };

  const buttonDisabled =
    isLoading || !credentials.email || !credentials.password;

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Inicia sesión en Nodepop</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="email"
          label="Email"
          className="loginForm-field"
          onChange={handleChange}
          value={credentials.email}
          autofocus
        />
        <FormField
          type="password"
          name="password"
          label="password"
          className="loginForm-field"
          onChange={handleChange}
          value={credentials.password}
        />
        <Button
          type="submit"
          variant="primary"
          className="loginForm-submit"
          disabled={buttonDisabled}
        >
          Log in
        </Button>
      </form>
      <div>
        <label>
          <input
            type="checkbox"
            checked={checkboxChecked}
            onChange={handleCheckboxChange}
          />
          Mantener sesión iniciada
        </label>
      </div>
      {error && (
        <div onClick={resetError} className="loginPage-error">
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
