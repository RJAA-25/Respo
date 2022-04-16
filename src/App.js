import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./UI/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";

const App = () => {
  let isLoggedIn = false;

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          {isLoggedIn ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route path="/register">
          {isLoggedIn ? <Redirect to="/dashboard" /> : <Register />}
        </Route>
        <Route path="/dashboard">
          {isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}
        </Route>
        <Route path="*">Page not Found</Route>
      </Switch>
    </Layout>
  );
};

export default App;
