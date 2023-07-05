import React from "react";
import { Link } from "react-router-dom";

const Summary = () => {
  return (
    <>
      <h1>Summary / 프레젠테이션 요약 </h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to="/presentation/speech?speech_id=1">Speech 1</Link>
        <Link to="/presentation/speech?speech_id=2">Speech 2</Link>
      </div>
    </>
  );
};

export default Summary;
