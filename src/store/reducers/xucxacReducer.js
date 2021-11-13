const initialState = {
  taiXiu: true, 
  mangXingau: [
    { score: 1, image: "./img/xucxac/1.png" },
    { score: 2, image: "./img/xucxac/2.png" },
    { score: 6, image: "./img/xucxac/6.png" },
  ],
  soBanThang: 0,
  tongSoBanChoi: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TAIXIU":
      state.soBanThang = 0;
      state.tongSoBanChoi = 0;
      state.taiXiu = action.payload;
      return { ...state };

    case "PLAY_GAME":
      state.mangXingau = action.payload.randomDiceArr;
      state.tongSoBanChoi += 1;
      state.soBanThang = action.payload.winTimes;
      return { ...state };

    default:
      return state;
  }
};

export default reducer;
