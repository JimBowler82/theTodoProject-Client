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
  const [todos, setTodos] = useState([]);
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
        setTodos(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleChange(e) {
    setTodoText(e.target.value);
  }

  async function addTodo() {
    if (!todoText) return;
    const newTodoList = [
      ...todos,
      { content: todoText, completed: false, date: moment().format() },
    ];

    try {
      const data = { data: newTodoList };
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/todos",
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (result.success) {
        console.log("Added new todo to db");
        console.log("data returned", result.data);
        setTodos(newTodoList);
      } else {
        console.log(`Failed to add todo to db: ${result.message}`);
      }
    } catch (err) {
      console.log(`Error with POST fetch: ${err}`);
    }
    setTodoText("");
  }

  async function deleteTodo(id) {
    const index = todos.findIndex((todo) => todo._id === id);
    if (index === -1) return;

    const newTodoList = [...todos.slice(0, index), ...todos.slice(index + 1)];

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        console.log("Deleted todo from db");
        setTodos(newTodoList);
      } else {
        console.log(`Failed to delete todo from db: ${result.message}`);
      }
    } catch (err) {
      console.log(`Error with DELETE fetch: ${err}`);
    }
  }

  async function updateTodo(text, id) {
    const index = todos.findIndex((todo) => todo._id === id);
    if (index === -1) return;

    const updatedTodo = { ...todos[index], content: text };

    try {
      const data = { data: updatedTodo };
      console.log({ data });
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (result.success) {
        console.log("Updated todo in db");
        console.log("data returned", result.data);
        setTodos([
          ...todos.slice(0, index),
          updatedTodo,
          ...todos.slice(index + 1),
        ]);
      } else {
        console.log(`Failed to update todo in db: ${result.message}`);
      }
    } catch (err) {
      console.log(`Error with PATCH fetch: ${err}`);
    }
  }

  async function toggleCompleted(id) {
    console.log("toggle", id);
    const index = todos.findIndex((todo) => todo._id === id);
    if (index === -1) return;

    const toggledTodo = { ...todos[index], completed: !todos[index].completed };

    try {
      const data = { data: toggledTodo };
      console.log({ data });
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (result.success) {
        console.log("Toggled todo in db");
        console.log("data returned", result.data);
        setTodos([
          ...todos.slice(0, index),
          toggledTodo,
          ...todos.slice(index + 1),
        ]);
      } else {
        console.log(`Failed to toggle todo in db: ${result.message}`);
      }
    } catch (err) {
      console.log(`Error with PATCH fetch: ${err}`);
    }
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
                  key={item._id}
                  item={item}
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
      </main>
    </>
  );
}
