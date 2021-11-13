import { DarkTheme } from "../../Projects/TodoList/Themes/DarkTheme";
import { actionType } from "../actions/type";

const initialState = {
  theme: DarkTheme,
  taskList: [
    { id: "task-1", taskName: "Task 1", done: true },
    { id: "task-2", taskName: "Task 2", done: false },
    { id: "task-3", taskName: "Task 3", done: true },
    { id: "task-4", taskName: "Task 4", done: false },
  ],
  taskEdit: { id: "", taskName: "", done: false },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.SET_TASK:
      return { ...state, taskList: payload };

    case actionType.SWITCH_THEME:
      state.theme = payload;
      return { ...state };

    case actionType.EDIT_TASK:
      state.taskEdit = payload;
      return { ...state };

    default:
      return state;
  }
};
