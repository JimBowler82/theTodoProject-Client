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
          <Route path="/todoList" component={TodoList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
