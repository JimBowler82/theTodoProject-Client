import React from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { Button } from "@chakra-ui/react";

export default function LogoutBtn() {
  const { user, setAuth } = useAuthContext();
  const history = useHistory();

  function logout() {
    localStorage.setItem("token", "");
    setAuth({ type: "logout" });
    history.push("/login");
  }

  return (
    <Button colorScheme="red" size="sm" onClick={logout}>
      Log Out
    </Button>
  );
}
