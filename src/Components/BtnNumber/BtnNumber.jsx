import React from "react";

export function BtnNumber({ label, action = () => null, className = null }) {
  return (
    <button
      className={`${className}`}
      onClick={() => {
        action(label);
      }}
    >
      {label}
    </button>
  );
}
