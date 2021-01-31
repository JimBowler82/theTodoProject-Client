import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/authContext";
import { useHistory } from "react-router-dom";
import { Button, Spinner, StylesProvider } from "@chakra-ui/react";
import Header from "../header";
import styles from "./index.module.css";

export default function TodoList() {
  const [todos, setTodos] = useState(["none"]);
  const { user, setAuth } = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    if (!user.name) return logout();
    fetch(process.env.REACT_APP_SERVER_URL + "/todos", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) {
          return logout();
        }
        setTodos(["Todos from DB"]);
      })
      .catch((err) => console.log(err));
  }, []);

  function logout() {
    localStorage.setItem("token", "");
    setAuth({ type: "logout" });
    history.push("/login");
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        {!user.id && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
        {user.id && (
          <div>
            <h1>Here is your todolist!</h1>
            <pre>{JSON.stringify(user)}</pre>
            <p>{todos || "no todos"}</p>
            <Button colorScheme="red" size="sm" onClick={logout}>
              Log Out
            </Button>
          </div>
        )}
      </main>
    </>
  );
}
