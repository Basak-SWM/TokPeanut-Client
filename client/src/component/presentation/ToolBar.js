import React from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import peanut_cursor from "../../image/peanut_cursor.png";

const Tools = styled.div`
  width: 100px;
  height: 500px;
  border: 1px solid grey;
  border-radius: 5px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: 2px 3px 5px 0px grey;
`;

const Tool = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 40px;
  background-color: ${(props) => props.color || "orange"};

  &:hover {
    background-color: black;
  }
  &:active,
  &:focus {
    width: 30px;
    height: 30px;
    cursor: url(${peanut_cursor}) 10 10, grab;
  }
`;

const ToolBar = () => {
  // console.log(peanut_run);
  const colors = ["red", "orange", "yellow", "green", "blue", "purple"];

  const clickTool = (e) => {
    console.log("click tool");
    // console.log(e.target);
  };

  return (
    <Tools>
      {colors.map((c, i) => (
        <Draggable key={i}>
          <Tool color={c} onClick={clickTool} />
        </Draggable>
      ))}
    </Tools>
  );
};

export default ToolBar;
