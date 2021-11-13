import React from "react";
import { useSelector } from "react-redux";

const GameInfo = () => {

  const infoFromStore = useSelector((state) => {
    return {
      taiXiu: state.xucxacReducer.taiXiu,
      soBanThang: state.xucxacReducer.soBanThang,
      tongSoBanChoi: state.xucxacReducer.tongSoBanChoi,
    };
  });

  const { taiXiu, soBanThang, tongSoBanChoi } = infoFromStore;

  return (
    <div>
      <div className="h2">
        BẠN CHỌN: <span className="text-danger ">{taiXiu ? "TÀI" : "XỈU"}</span>
      </div>

      <div className="h2">
        BÀN THẮNG: <span className="text-success">{soBanThang}</span>
      </div>

      <div className="h2">
        TỔNG SỐ BÀN CHƠI: <span className="text-primary">{tongSoBanChoi}</span>
      </div>
    </div>
  );
};

export default GameInfo;
