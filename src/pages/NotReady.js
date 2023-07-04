import React from "react";
import peanut_run from "../image/peanut_run.png";

const NotReady = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={peanut_run} width={600} alt="not ready" />
      <h1>아직 개발 중.</h1>
    </div>
  );
};

export default NotReady;
