import React, { useState } from "react";
import styles from "./index.module.css";
import Header from "../../components/header";
import { Button, Input } from "@chakra-ui/react";

function Home() {
  const [formData, setFormData] = useState({});

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
      console.log("User has successfully registered!");
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
            <p>Register now for your own personal todo list!</p>
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

export default Home;
