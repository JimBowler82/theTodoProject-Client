import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/App";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/authContext";
ReactDOM.render(
  <AuthProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </AuthProvider>,
  document.getElementById("root")
);
