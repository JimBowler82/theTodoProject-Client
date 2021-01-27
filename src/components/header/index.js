import React from "react";
import styles from "./index.module.css";
import { Avatar } from "@chakra-ui/react";

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <h1>theTodoApp Project</h1>
        <div className={styles.userArea}>
          <Avatar bg="gray.500" />
          <span>Guest</span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
