import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/App";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
