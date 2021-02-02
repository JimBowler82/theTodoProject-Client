import React, { useState, useEffect } from "react";
import moment from "moment";
import styles from "./index.module.css";
import Header from "../header";
import TodoItem from "../todoItem";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { Button, Spinner, Input } from "@chakra-ui/react";
import { listData } from "./data";

export default function TodoList() {
  const [todos, setTodos] = useState(listData);
  const [todoText, setTodoText] = useState("");
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
        //setTodos(["Todos from DB"]);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleChange(e) {
    setTodoText(e.target.value);
  }

  function addTodo() {
    if (!todoText) return;
    setTodos([
      ...todos,
      { content: todoText, completed: false, date: moment().format() },
    ]);
    setTodoText("");
  }

  function deleteTodo(index) {
    console.log("delete todo", index);
    setTodos([...todos.slice(0, index), ...todos.slice(index + 1)]);
  }

  function updateTodo(text, index) {
    setTodos([
      ...todos.slice(0, index),
      { ...todos[index], content: text },
      ...todos.slice(index + 1),
    ]);
  }

  function toggleCompleted(index) {
    console.log("toggle", index);
    setTodos([
      ...todos.slice(0, index),
      { ...todos[index], completed: !todos[index].completed },
      ...todos.slice(index + 1),
    ]);
  }

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
                value={todoText}
                style={{
                  borderTopRightRadius: "0",
                  borderBottomRightRadius: "0",
                  borderColor: "#999",
                }}
                onChange={(e) => handleChange(e)}
              />
              <Button
                colorScheme="teal"
                style={{
                  borderTopLeftRadius: "0",
                  borderBottomLeftRadius: "0",
                }}
                onClick={addTodo}
              >
                Add To List
              </Button>
            </div>
          </div>
          <div className={styles.todoListDiv}>
            {todos.map((item, i) => {
              return (
                <TodoItem
                  key={i}
                  item={item}
                  i={i}
                  del={deleteTodo}
                  update={updateTodo}
                  toggle={toggleCompleted}
                />
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
