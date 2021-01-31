import React from "react";
import styles from "./index.module.css";
import { Avatar } from "@chakra-ui/react";
import { useAuthContext } from "../../context/authContext";

function Header() {
  const { user } = useAuthContext();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <h1 className={styles.h1}>theTodoApp Project</h1>
        <div className={styles.userArea}>
          <Avatar bg={user.name ? "green.500" : "gray.500"} />
          <span>{user.name || "Guest"}</span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
