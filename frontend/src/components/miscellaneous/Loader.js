import React, { useState } from "react";
import "./loader2.css"; // Import the CSS file for styling

const Loader = () => {
  return (
    <div className="loader">
      <div className="square square1"></div>
      <div className="square square2"></div>
      <div className="square square3"></div>
      <div className="square square4"></div>
    </div>
  );
};

export default Loader;
