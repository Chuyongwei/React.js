import { createStore } from "redux";

function counterReducer(state=0, action) {
  switch (action.type) {
    case "ADD":
      console.log(state);
      return state + 1;
    case "MINUS":
      return state - 1;
			default :return state
  }
  
}

const store = createStore(counterReducer);

export default store