import React, { useState } from "react";
import styles from "./index.module.css";
import Header from "../header";
import { Button, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({});

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/user/login`,
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
      console.log("User has successfully logged in!");
    } else {
      // display a error message
      console.log(`Error: ${message}`);
    }
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.welcomeContainer}>
          <div className={styles.welcomeDiv}>
            <h3>Welcome!</h3>
            <p>Log in now to access your todo list!</p>
            <p className={styles.regLink}>
              Need an account?{" "}
              <span>
                <Link to="/register">Register!</Link>
              </span>
            </p>
          </div>
          <div className={styles.registerDiv}>
            <form onSubmit={(e) => handleSubmit(e)}>
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
                Log In
              </Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}