import React, { useState } from "react";
import styles from "./index.module.css";
import Header from "../header";
import AlertBox from "../alertBox";
import { Button, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const { success, message } = await response.json();
    if (success) {
      // Activate a success message, proceed as logged in.
      if (error) setError(false);
      setSuccess("You have successfully registered!");
    } else {
      // display a error message
      if (success) setSuccess(false);
      setError(message);
    }
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        {error && (
          <AlertBox
            type="error"
            title="Error!"
            message={error}
            close={setError}
          />
        )}
        {success && (
          <AlertBox
            type="success"
            title="Success!"
            message={success}
            close={setSuccess}
          />
        )}
        <div className={styles.welcomeContainer}>
          <div className={styles.welcomeDiv}>
            <h3>Welcome!</h3>
            <p>Register now for your own personal todo list!</p>
            <p className={styles.loginLink}>
              Already have an account?{" "}
              <span>
                <Link to="/login">Log In!</Link>
              </span>
            </p>
          </div>
          <div className={styles.registerDiv}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                type="text"
                size="md"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                size="md"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                type="password"
                size="md"
                onChange={(e) => handleChange(e)}
              />
              <Button type="submit" colorScheme="green">
                Register
              </Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
