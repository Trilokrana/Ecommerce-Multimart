import React from "react";

const Helmet = (props) => {
  document.title = "MaltiMart-" + props.title;
  return <div>{props.children}</div>;
};

export default Helmet;
