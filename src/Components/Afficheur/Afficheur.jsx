import React from "react";

// import "./afficheur.styles.scss";
export default function Afficher({ children, className = null }) {
  return <div className={`afficheur ${className}`}> {children}</div>;
}
