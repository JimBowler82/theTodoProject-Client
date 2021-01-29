import styles from "./App.module.css";
import Register from "../register";
import Login from "../login";
import TodoList from "../todoList";
import PrivateRoute from "../privateRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoute exact path="/" component={TodoList} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
