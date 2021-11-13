import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const ticketInfo = useSelector((state) => {
    return {
      total: state.busTicketReducer.total,
      toBuyList: state.busTicketReducer.toBuyList,
    };
  });
  const { toBuyList, total } = ticketInfo;

  return (
    <div>
      <h4 className="bg-light">Ghế đặt ({toBuyList.length})</h4>
      {toBuyList.map((item, i) => {
        return (
          <p key={i}>
            <span className="mr-5">Số ghế: {item.SoGhe} </span>
            <span> Giá: $ {item.Gia}</span>
          </p>
        );
      })}
      <hr />
      <p>Tổng Cộng: $ {total}</p>
    </div>
  );
};

export default Cart;
