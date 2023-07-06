import React from "react";
import styled from "styled-components";
import Draggable from "react-draggable";

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
  background-color: orange;

  &:hover {
    background-color: brown;
  }
`;

const ToolBar = () => {
  const colors = ["red", "orange", "yellow", "green", "blue", "purple"];
  return (
    <Tools>
      {colors.map(() => (
        <Draggable>
          <Tool />
        </Draggable>
      ))}
    </Tools>
  );
};

export default ToolBar;
