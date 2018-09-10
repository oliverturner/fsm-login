import { Machine } from "xstate";

export const appMachine = Machine({
  initial: "loggedOut",
  states: {
    loggedOut: {
      on: {
        SUBMIT: "loading"
      }
    },
    loading: {
      onEntry: ["loadingEnter"],
      onExit: ["loadingExit"],
      on: {
        SUCCESS: "loggedIn",
        FAILURE: "error"
      }
    },
    loggedIn: {
      onEntry: ["loggedInEnter"],
      onExit: ["loggedInExit"],
      on: {
        LOGOUT: "loggedOut"
      }
    },
    error: {
      onEntry: ["onError"],
      on: {
        SUBMIT: "loading"
      }
    }
  }
});
