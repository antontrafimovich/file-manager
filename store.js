import { homedir } from "node:os";

class Store {
  constructor() {
    this.state = {
      workingDirectory: homedir(),
    };

    this.reducers = [
      (state, { type, payload }) => {
        if (type === "SET_WORKING_DIR") {
          return {
            ...state,
            workingDirectory: payload,
          };
        }
      },
    ];

    this.listeners = [];
  }

  trigger(action) {
    this.state = this.reducers.reduce((result, next) => {
      return next(result, action);
    }, this.state);

    this.listeners.forEach((fn) => fn(this.state));
  }

  onUpdate(fn) {
    this.listeners = [...this.listeners, fn];
    fn(this.state);
  }
}

const store = new Store();

export default store;
