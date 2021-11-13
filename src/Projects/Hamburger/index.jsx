import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

const Burger = () => {
  const dispatch =useDispatch();
  const burgerInfo = useSelector((state) => {
    return {
      burger: state.burgerReducer.burger,
      menu: state.burgerReducer.menu,
      total: state.burgerReducer.total,
    };
  });
  console.log(burgerInfo);

  const { burger, menu, total } = burgerInfo;

  const renderMenu = () => {
    return Object.entries(menu).map(([menuIngre, price], index) => {
      return (
        <tr key={index}>
          <td>{menuIngre}</td>
          <td>
            <button
              onClick={() => {
                addBurgerContent(menuIngre, 1)
              }}
              className="btn btn-success mr-2"
            >
              +
            </button> 
            {burger[menuIngre]}
            <button
              onClick={() => {
                addBurgerContent(menuIngre, -1)
              }}
              className="btn btn-danger ml-2"
            >
              -
            </button>
          </td>
          <td>${price}</td>
          <td>${burger[menuIngre] * price}</td>
        </tr>
      );
    });
  };

  const addBurgerContent = (ingredient, amount) => {
    const cloneBurger = { ...burger };

    if (amount === -1 && cloneBurger[ingredient] < 1) {
      return cloneBurger;
    }

    cloneBurger[ingredient] += amount;

    const cloneMenu = menu;
    let cloneTotal = total;
    cloneTotal += amount * cloneMenu[ingredient];

    dispatch({
      type: "ADD_BURGERCONTENT",
      payload: {
        cloneBurger,
        cloneTotal,
      },
    });
  };

  return (
    <div>
      <div className="container">
        <h3 className="display-4 text-success text-center mt-3 mb-5 font-weight-bold">Project of Hamburger</h3>
        <div className="row">
          <div className="col-7">
            <h3 className="text-center text-danger">Bánh burger</h3>
            <div className="bread-top"></div>
            <div className="seeds"></div>
            <div className="seeds2"></div>
            
            {/* Giao diện nhân burger: */}
            {Object.entries(burger).map(([ingredient, quantity], index) => {
              console.log("obj entries: ", ingredient, quantity);

              let oneIngredientAmount = [];
              for (let i = 0; i < quantity; i++) {
                oneIngredientAmount.push(
                  <div key={i} className={ingredient}></div>
                );
              }
              return oneIngredientAmount;
            })}

            <div className="bread-bottom"></div>
          </div>

          <div className="col-5">
            <h3 className="text-center ">Chọn nhân</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Nhân</th>
                  <th></th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              {renderMenu()}
              <tfoot>
                <tr>
                  <td colSpan="2"></td>
                  <td>Tổng cộng</td>
                  <td>$ {total}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Burger;
