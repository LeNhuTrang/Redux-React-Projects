import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Cucxingau from "./Xingau";
import GameInfo from "./GameInfo";
import "./xucxac.css";

const Xucxac = () => {
  const dispatch = useDispatch();

  const infoFromStore = useSelector((state) => {
    return {
      taiXiu: state.xucxacReducer.taiXiu,
      soBanThang: state.xucxacReducer.soBanThang,
    };
  });

  const { taiXiu, soBanThang } = infoFromStore;

  const handleTaiXiu = (taiXiu) => {
    dispatch({
      type: "SET_TAIXIU",
      payload: taiXiu,
    });
  };

  const handlePlay = () => {
    let randomDiceArr = [];

    for (let i = 0; i < 3; i++) {
      let randomNumber = Math.floor(Math.random() * 6) + 1;

      let oneRandomDice = {
        score: randomNumber,
        image: `./img/xucxac/${randomNumber}.png`,
      };

      randomDiceArr.push(oneRandomDice);
    }

    /**số bàn thắng:*/
    let winTimes = soBanThang;

    let scores = randomDiceArr.reduce((total, oneDice) => {
      return (total += oneDice.score);
    }, 0);

    if ((scores > 11 && taiXiu) || (scores <= 11 && !taiXiu)) {
      winTimes += 1;
    }

    dispatch({
      type: "PLAY_GAME",
      payload: {
        randomDiceArr,
        winTimes,
      },
    });
  };

  return (
    <div className="game">
      <div className="title text-center mt-5 display-4"> Game Xúc Xắc</div>

      {/* TÀI */}
      <div className="row text-center mt-5">
        <div className="col-5">
          <button
            onClick={() => {
              handleTaiXiu(true)
            }}
            className="btnGame"
          >
            TÀI
          </button>
        </div>

        {/*  CỤC XÍ NGẦU */}
        <div className="col-2">
          <Cucxingau />
        </div>

        {/* XỈU */}
        <div className="col-5">
          <button
            onClick={() => {
              handleTaiXiu(false)
            }}
            className="btnGame"
          >
            XỈU
          </button>
        </div>
      </div>

      {/* GAME INFO - BUTTON */}
      <div className="gameInfo text-center">
        <GameInfo />
        <button
          onClick={handlePlay}
          className="btn btn-success p3 display-4 mt-5"
        >
          Play Game
        </button>
      </div>
    </div>
  );
};

export default Xucxac;
