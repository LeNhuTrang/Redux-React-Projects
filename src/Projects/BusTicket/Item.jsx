import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Item = (props) => {
  const toBuyList = useSelector((state) => {
    return state.busTicketReducer.toBuyList;
  });

  const dispatch = useDispatch();

  const handleChooseSeat = (chosenSeat) => {
    const foundIndex = toBuyList.findIndex((item) => {
      return item.SoGhe === chosenSeat.SoGhe;
    });

    if (foundIndex === -1) {
      toBuyList.push(chosenSeat);
    } else {
      toBuyList.splice(foundIndex, 1);
    }

    let totalPrice = 0;
    for (let i of toBuyList) {
      totalPrice += i.Gia;
    }

    dispatch({
      type: "BOOK_SEAT",
      payload: {
        toBuyList,
        totalPrice,
      },
    });
  };

  const { SoGhe, TrangThai } = props.seat;

  return (
    <div>
      {TrangThai ? (
        <button
          className="btn btn-danger"
          disabled
          style={{ width: 50, height: 50 }}
        >
          {SoGhe}
        </button>
      ) : (
        <button
          className={`mr-2 btn ${
            props.isBooking ? "btn-success" : "btn-light"
          } `}
          style={{ width: 50, height: 50 }}
          onClick={() => handleChooseSeat(props.seat)}
        >
          {SoGhe}
        </button>
      )}
    </div>
  );
};

export default Item;
