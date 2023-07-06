import React from "react";
import Script from "./Script";
import ToolBar from "./ToolBar";
import { Link } from "react-router-dom";

const Speech = () => {
  return (
    <>
      <h1>Speech / 스크립트(피드백) 화면</h1>
      <div style={{ display: "flex" }}>
        <ToolBar />
        <Script />
      </div>
      <Link to="/presentation/practice">연습 시작</Link>
    </>
  );
};

export default Speech;
