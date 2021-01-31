import React, { createContext, useContext, useReducer } from "react";

const AuthContext = createContext({});

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...action.payload };
    case "register":
      return { ...action.payload };
    case "logout":
      return {};
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {});

  return (
    <AuthContext.Provider value={{ user: state, setAuth: dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
