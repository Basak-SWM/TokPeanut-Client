import React from "react";
import { Link } from "react-router-dom";

const PresentationList = () => {
  return (
    <>
      <h1>PresentationList / 프레젠테이션 화면</h1>
      <p>프레젠테이션 리스트</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to="/presentation/summary?presentation_id=1">Presentation 1</Link>
        <Link to="/presentation/summary?presentation_id=2">Presentation 2</Link>
        <Link to="/presentation/new">새 프레젠테이션</Link>
      </div>
    </>
  );
};

export default PresentationList;
