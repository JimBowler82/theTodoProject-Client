import React, { useState } from "react";
import moment from "moment";
import styles from "./index.module.css";
import { Checkbox, Tooltip, Input } from "@chakra-ui/react";
import { BsCheckBox, BsPencilSquare, BsTrash } from "react-icons/bs";

export default function TodoItem({ item, del, update, toggle }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(item.content);

  function handleUpdate(mode) {
    if (mode) {
      setIsUpdating(mode);
    } else {
      update(updatedTodo, item._id);
      setIsUpdating(false);
    }
  }

  return (
    <div className={styles.listItem} onChange={() => toggle(item._id)}>
      <Checkbox colorScheme="green" className={styles.checkbox} />

      <div key={item._id} className={styles.todoDetails}>
        {!isUpdating && (
          <p className={item.completed ? styles.completed : ""}>
            {item.content}
          </p>
        )}
        {isUpdating && (
          <Input
            size="xs"
            type="text"
            value={updatedTodo}
            autoFocus
            onChange={(e) => setUpdatedTodo(e.target.value)}
          />
        )}
        <p>
          <em>{moment(item.date).fromNow()}</em>
        </p>
      </div>
      <div className={styles.iconBtns}>
        {!isUpdating && (
          <Tooltip label="Update Todo" hasArrow>
            <span>
              <BsPencilSquare onClick={() => handleUpdate(true)} />
            </span>
          </Tooltip>
        )}
        {isUpdating && (
          <Tooltip label="Update" hasArrow>
            <span>
              <BsCheckBox onClick={() => handleUpdate(false)} />
            </span>
          </Tooltip>
        )}

        <Tooltip label="Delete Todo" hasArrow>
          <span>
            <BsTrash onClick={() => del(item._id)} />
          </span>
        </Tooltip>
      </div>
    </div>
  );
}
