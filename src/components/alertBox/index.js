import React, { useEffect } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

const style = {
  maxWidth: "600px",
  margin: "10px auto",
};

export default function AlertBox({ type, title, message, close }) {
  useEffect(() => {
    setTimeout(() => {
      close(false);
    }, 5000);
  });

  return (
    <Alert status={type} style={style}>
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={() => close(false)}
      />
    </Alert>
  );
}
