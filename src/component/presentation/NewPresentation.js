import React from "react";
import { Link } from "react-router-dom";

const NewPresentation = () => {
  return (
    <>
      <h1>NewPresentation / 프레젠테이션 생성 </h1>
      <div>~정보 입력~</div>
      <Link to="/presentation/new/practice">스피치 시작하기</Link>
    </>
  );
};

export default NewPresentation;
