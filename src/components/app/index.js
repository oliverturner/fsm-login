import React from "react";
import { State, withStateMachine } from "react-automata";

import { appMachine } from "./states";
import Login from "../login";
import Dashboard from "../dashboard";

export const AuthContext = React.createContext();

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      logout: this.logout,
      error: "",
      user: {}
    };
  }

  logout = event => {
    event.preventDefault();
    this.props.transition("LOGOUT");
  };

  loggedInEnter(event) {
    if (event && event.user)
      this.setState({
        error: "",
        user: { name: event.user }
      });
  }

  loggedInExit() {
    this.setState({ user: {} });
  }

  loadingEnter() {
    this.setState({ isLoading: true });
  }

  loadingExit() {
    this.setState({ isLoading: false });
  }

  onError = event => {
    if (event && event.error) this.setState({ error: event.error });
  };

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        <State is="loggedIn">
          <Dashboard />
        </State>
        <State is={["loggedOut", "loading", "error"]}>
          <Login transition={this.props.transition} />
        </State>
      </AuthContext.Provider>
    );
  }
}

export default withStateMachine(appMachine, { devTools: true })(App);
