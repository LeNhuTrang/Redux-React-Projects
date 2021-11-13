import React from 'react';
import { useSelector } from 'react-redux';


const Xingau = () => {
  const mangXingau = useSelector((state)=>{
    return state.xucxacReducer.mangXingau;
    
  })

  return (
    <div>
      {mangXingau.map((item, i) => {
          return (
            <img
              key={i}
              src={item.image}
              className="ml-2"
              style={{ width: 50, height: 50 }}
              alt=""
            />
          );
        })
      }
    </div>
  );
  
}

export default Xingau;

