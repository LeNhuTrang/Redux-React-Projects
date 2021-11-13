import React from "react";
import Cart from "./Cart";
import List from "./List";

const Home = () => {
  return (
    <div className="container text-center">
      <h1 className="m-4 text-warning">Đặt ghế xe buýt</h1>
      <div className="row">
        <div className="col-6">
          <List />
        </div>

        <div className="col-6">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default Home;
