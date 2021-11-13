const initialState = {
  themeState: 2,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_THEME":
      state.themeState = action.payload;
      console.log("reducer : ", action.payload);
      return { ...state };
    default:
      return state;
  }
};

export default reducer;

