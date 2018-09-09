import { Machine } from "xstate";

export const appMachine = Machine({
  initial: "loggedOut",
  states: {
    loggedOut: {
      onEntry: ["error"],
      on: {
        SUBMIT: "loading"
      }
    },
    loading: {
      on: {
        SUCCESS: "loggedIn",
        FAILURE: "loggedOut"
      }
    },
    loggedIn: {
      onEntry: ["setUser"],
      onExit: ["unsetUser"],
      on: {
        LOGOUT: "loggedOut"
      }
    }
  }
});
