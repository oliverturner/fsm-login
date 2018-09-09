import React from "react";

import { appMachine } from "./states";
import Login from "../login";
import Dashboard from "../dashboard";

export const Auth = React.createContext();

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      authState: appMachine.initialState.value,
      logout: this.logout,
      error: ""
    };
  }

  logout = event => {
    event.preventDefault();
    this.transition({ type: "LOGOUT" });
  };

  transition = event => {
    const nextAuthState = appMachine.transition(
      this.state.authState,
      event.type
    );

    const nextState = nextAuthState.actions.reduce((state, action) => {
      return this.command(action, event) || state;
    }, undefined);

    this.setState({ ...nextState, authState: nextAuthState.value });
  };

  command(action, event) {
    const handlers = {
      unsetUser: () => ({ user: {} }),

      setUser: ({ user }) => {
        if (user) return { user: { name: user } };
      },

      error: ({ error }) => {
        if (error) return { error };
      }
    };

    if (handlers[action]) return handlers[action](event);
  }

  render() {
    const isLoggedIn = this.state.authState === "loggedIn";

    return (
      <Auth.Provider value={this.state}>
        <div>
          {isLoggedIn ? <Dashboard /> : <Login transition={this.transition} />}
        </div>
      </Auth.Provider>
    );
  }
}

export default App;
