import React from "react";

import { AuthContext } from "./app";

const Dashboard = () => {
  return (
    <AuthContext.Consumer>
      {({ user, logout }) => {
        return (
          <div>
            <h1>Hello {user && user.name}</h1>
            <button onClick={logout}>Logout</button>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Dashboard;
