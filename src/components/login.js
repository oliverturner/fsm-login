import React from "react";

import { Auth } from "./app";

class Login extends React.Component {
  state = {
    user: ""
  };

  onChange = e => {
    this.setState({
      user: e.target.value
    });
  };

  formReset = () => {
    this.setState({ userName: "" });
  };

  onSubmit = e => {
    e.preventDefault();

    const { transition } = this.props;

    transition({ type: "SUBMIT" });

    setTimeout(() => {
      const { user } = this.state;

      if (user.length) {
        return transition({ type: "SUCCESS", user }, this.formReset);
      }

      return transition({ type: "FAILURE", error: "You must supply a name" });
    }, 2000);
  };

  render() {
    return (
      <Auth.Consumer>
        {({ authState, error }) => {
          const isLoading = authState === "loading";
          const label = isLoading ? "Logging in..." : "Login";
          const errorClass = error ? "error" : "";

          return (
            <form className="login-form" onSubmit={this.onSubmit}>
              <h2>Log in to your account</h2>
              <p className="error-message">{error}</p>
              <label htmlFor="user" />
              <input
                className={errorClass}
                id="user"
                type="text"
                placeholder="Username"
                value={this.state.user}
                onChange={this.onChange}
              />
              <button disabled={isLoading}>{label}</button>
            </form>
          );
        }}
      </Auth.Consumer>
    );
  }
}

export default Login;
