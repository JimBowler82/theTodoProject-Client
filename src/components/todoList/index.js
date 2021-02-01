import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/authContext";
import { useHistory } from "react-router-dom";
import { Button, Spinner, Input } from "@chakra-ui/react";
import moment from "moment";
import Header from "../header";
import styles from "./index.module.css";
import { listData } from "./data";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

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
        <div className={styles.container}>
          <div className={styles.addTodoDiv}>
            <div className={styles.date}>
              <p>{moment().format("dddd")}</p>
              <p>{moment().format("Do MMMM YYYY")}</p>
            </div>
            <div className={styles.input}>
              <Input
                placeholder="Enter a todo"
                style={{
                  borderTopRightRadius: "0",
                  borderBottomRightRadius: "0",
                  borderColor: "#999",
                }}
              />
              <Button
                colorScheme="teal"
                style={{
                  borderTopLeftRadius: "0",
                  borderBottomLeftRadius: "0",
                }}
              >
                Add To List
              </Button>
            </div>
          </div>
          <div className={styles.todoListDiv}>
            {listData.map((item, i) => {
              return (
                <div key={i} className={styles.listItem}>
                  <div className={styles.todoDetails}>
                    <p>{item.content}</p>
                    <p>Completed: {item.completed ? "✔️" : "❌"}</p>
                  </div>
                  <div className={styles.iconBtns}>
                    <span>{<BsPencilSquare />}</span>
                    <span>{<BsTrash />}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
          <div className={styles.devInfo}>
            <pre>{JSON.stringify(user)}</pre>
            <Button colorScheme="red" size="sm" onClick={logout}>
              Log Out
            </Button>
          </div>
        )}
      </main>
    </>
  );
}
