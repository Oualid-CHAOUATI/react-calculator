import React from "react";

export function BtnNumber({
  label = "",
  action = () => null,
  className = null,
  actionParam = null,
}) {
  const clickHandler = (e) => {
    action(actionParam || label);
  };
  return (
    <button className={`${className}`} onClick={clickHandler}>
      {label}
    </button>
  );
}
