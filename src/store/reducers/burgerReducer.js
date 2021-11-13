const initialState = {
  burger: {
    salad: 1,
    cheese: 1,
    beef: 1,
  },
  menu: {
    salad: 10,
    cheese: 20,
    beef: 55,
  },
  total: 85,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_BURGERCONTENT":
      state.burger = action.payload.cloneBurger;
      state.total = action.payload.cloneTotal;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
