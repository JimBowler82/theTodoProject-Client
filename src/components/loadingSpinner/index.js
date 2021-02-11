import React from "react";
import styles from "./index.module.css";
import { Spinner } from "@chakra-ui/react";

export default function LoadingSpinner() {
  return (
    <div className={styles.spinContainer}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </div>
  );
}
