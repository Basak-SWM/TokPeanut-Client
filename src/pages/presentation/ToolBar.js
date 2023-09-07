import React, { useState } from "react";
import styled from "styled-components";
import highlight from "../../image/icons/highlight.png";
import faster from "../../image/icons/faster.png";
import slower from "../../image/icons/slower.png";
import edit from "../../image/icons/edit.png";
import enter from "../../image/icons/enter.png";
import pause from "../../image/icons/pause.png";
import mouse from "../../image/icons/mouse.png";
import slash from "../../image/icons/slash.png";

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
  background-image: url(${(props) => props.src});
  background-size: cover;
  cursor: url(${(props) => props.cursor}) 25 25, grab;

  &:hover {
    width: 60px;
    height: 60px;
  }
`;

const ToolBar = () => {
  const [cursor, setCursor] = useState("");
  const [selected, setSelected] = useState(false);
  const symbols = [highlight, faster, slower, edit, enter, pause, mouse, slash];

  const clickTool = (e) => {
    setSelected(!selected);
    selected ? setCursor("") : setCursor(e.target.id);
  };

  return (
    <Tools>
      {symbols.map((c, i) => (
        <Tool key={i} id={c} src={c} cursor={cursor} onClick={clickTool} />
      ))}
    </Tools>
  );
};

export default ToolBar;
