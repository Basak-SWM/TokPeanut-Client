import React from "react";
import { Link } from "react-router-dom";
import NotReady from "../NotReady";

const SignIn = () => {
  return (
    <>
      <h1>SignIn / 회원가입 화명_일반 사용자</h1>
      <NotReady />
      <Link to="/signin/coach">코치로 가입하시나요?</Link>
    </>
  );
};

export default SignIn;
