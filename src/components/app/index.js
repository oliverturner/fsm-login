import React from "react";
import { State, withStateMachine } from "react-automata";

import { appMachine } from "./states";
import Login from "../login";
import Dashboard from "../dashboard";

export const Auth = React.createContext();

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      logout: this.logout,
      error: ""
    };
  }

  logout = event => {
    event.preventDefault();
    this.props.transition("LOGOUT");
  };

  loggedInEnter({ user }) {
    if (user)
      this.setState({
        error: "",
        user: { name: user }
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

  onError = ({ error }) => {
    if (error) this.setState({ error });
  };

  render() {
    console.log(this.props.machineState);
    console.log(this.state)

    return (
      <Auth.Provider value={this.state}>
        <div>
          <State is="loggedIn">
            <Dashboard />
          </State>
          <State is={["loggedOut", "loading", "error"]}>
            <Login transition={this.props.transition} />
          </State>
        </div>
      </Auth.Provider>
    );
  }
}

export default withStateMachine(appMachine)(App);
