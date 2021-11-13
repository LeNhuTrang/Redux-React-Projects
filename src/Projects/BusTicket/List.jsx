import React from "react";
import { useSelector } from "react-redux";
import Item from "./Item";

const List = () => {
  const ticketInfor = useSelector((state) => {
    return {
      seats: state.busTicketReducer.seats,
      toBuyList: state.busTicketReducer.toBuyList,
    };
  });

  const { seats, toBuyList } = ticketInfor;

  return (
    <div className="container">
      <h4 className="bg-light">Tài xế</h4>
      <div className="row">
        <div className="row mx-auto" style={{ width: "50%" }}>
          {seats.map((seat, i) => {
            const isBooking =
              toBuyList.findIndex((item) => item.SoGhe === seat.SoGhe) !== -1;
            return (
              <div key={i} className="text-center col-3 p-2">
                <Item seat={seat} isBooking={isBooking} toBuyList={toBuyList} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default List;
