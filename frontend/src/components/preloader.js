import React from "react";
import preloader from "../img/preloader.svg";

export default function Preloader() {
  return (
    <div className="absolute-center">
      <img src={preloader} alt="preloader" width="100" height="100" />
    </div>
  );
}
