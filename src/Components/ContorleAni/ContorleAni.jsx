import React from "react";

const ContorleAni = () => {
    return{
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),


  
}
}
export default ContorleAni;
