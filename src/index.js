import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import burgerReducer from "./store/reducers/burgerReducer";
import xucxacReducer from "./store/reducers/xucxacReducer"
import themeReducer from "./store/reducers/themeReducer"
import busTicketReducer from "./store/reducers/busTicketReducer"
import todoListReducer from "./store/reducers/todoListReducer"


const rootReducer = combineReducers({
  burgerReducer,
  xucxacReducer,
  themeReducer,
  busTicketReducer,
  todoListReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();