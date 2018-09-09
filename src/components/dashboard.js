import React from "react";

import { Auth } from "./app";

const Dashboard = () => {
  return (
    <Auth.Consumer>
      {({ user, logout }) => {
        console.log(logout);

        return (
          <div>
            <h1>Hello {user.name}</h1>
            <button onClick={logout}>Logout</button>
          </div>
        );
      }}
    </Auth.Consumer>
  );
};

export default Dashboard;