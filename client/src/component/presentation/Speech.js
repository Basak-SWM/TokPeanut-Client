import React, { useState, useRef, useCallback } from "react";
import Script from "./Script";
import { Link } from "react-router-dom";
import styled from "styled-components";

import peanut_cursor from "../../image/peanut_cursor.png";
import highlight from "../../image/icons/highlight.png";
import faster from "../../image/icons/faster.png";
import slower from "../../image/icons/slower.png";
import edit from "../../image/icons/edit.png";
import enter from "../../image/icons/enter.png";
import pause from "../../image/icons/pause.png";
import mouse from "../../image/icons/mouse.png";
import slash from "../../image/icons/slash.png";

const Container = styled.div`
  cursor: url(${(props) => props.cursor}) 25 25, grab;
  display: flex;
`;

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
  width: 30px;
  height: 30px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  cursor: url(${(props) => props.cursor}) 25 25, grab;

  &:hover {
    width: 40px;
    height: 40px;
  }
  // &:active,
  // &:focus {
  //   width: 30px;
  //   height: 30px;
  //   // cursor: url(${peanut_cursor}) 10 10, grab;
  // }
`;

const PlayedText = styled.span`
  color: orange;
  display: flex;
  margin-right: 5px;
`;

const Text = styled.span`
  color: black;
  display: flex;
  margin-right: 5px;
`;

const ScriptContainer = styled.div`
  width: 70vw;
  overflow-y: scroll;
  font-size: 24px;
  display: flex;
`;

// custom hook
const useCounter = (initialValue, ms) => {
  const [count, setCount] = useState(initialValue);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setCount((c) => c + 1);
    }, ms);
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);
  return { count, start, stop, reset };
};

const Speech = () => {
  // tool bar
  const [cursor, setCursor] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState(NaN); // 커서 관리를 위한 현재 선택된 기호 인덱스
  const symbols = [highlight, faster, slower, edit, enter, pause, mouse, slash];

  // 기호 클릭시 selectedSymbol을 해당 기호 이미지로 변경 -> 커서 변경
  // 한 번 더 클릭시 기본 커서로 변경
  const clickTool = (e) => {
    const selectedSymbolIdx = e.target.id;
    // if (selectedSymbol === "") {
    //   setSelectedSymbol(selectedSymbolIdx);
    //   console.log(selectedSymbolIdx);
    // } else {
    //   setSelectedSymbol("");
    // }
    if (selectedSymbol) {
      setSelectedSymbol(NaN);
    } else {
      setSelectedSymbol(selectedSymbolIdx);
      // console.log(selectedSymbolIdx);
    }
    // 커서 변경
    selectedSymbol ? setCursor("") : setCursor(symbols[selectedSymbolIdx]);
  };

  // script
  const text = "저희는 음성 데이터 분석을 통해".split(" ");
  const started = [3, 5, 8, 11, 13]; // 단어별 시작 시간
  started.unshift(0);
  // 각 기호의 렌더링 여부
  const [enterSymbol, setEnterSymbol] = useState(text.map(() => false));
  const [pauseSymbol, setPauseSymbol] = useState(text.map(() => false));
  const [mouseSymbol, setMouseSymbol] = useState(text.map(() => false));
  const [slashSymbol, setSlashSymbol] = useState(text.map(() => false));

  const { count, start, stop, reset } = useCounter(0, 1000); // 1초 단위 타이머

  const clickWord = (e) => {
    // 기호 표시
    const selectedWordIdx = e.target.id; // 클릭된 단어 인덱스
    // console.log("selectedSymbol: ", selectedSymbol);
    // console.log("selectedWordIdx: ", selectedWordIdx);
    switch (selectedSymbol) {
      case "4":
        enterSymbol[selectedWordIdx] = true;
        setEnterSymbol([...enterSymbol]);
        break;
      case "5":
        pauseSymbol[selectedWordIdx] = true;
        setPauseSymbol([...pauseSymbol]);
        break;
      case "6":
        mouseSymbol[selectedWordIdx] = true;
        setMouseSymbol([...mouseSymbol]);
        break;
      case "7":
        slashSymbol[selectedWordIdx] = true;
        setSlashSymbol([...slashSymbol]);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <h1>Speech / 스크립트(피드백) 화면</h1>
      <Container cursor={cursor}>
        <Tools>
          {symbols.map((c, i) => (
            <Tool key={i} id={i} src={c} cursor={cursor} onClick={clickTool} />
          ))}
        </Tools>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <ScriptContainer>
            {text.map((word, i) =>
              started[i] < count ? (
                <PlayedText onClick={clickWord} key={i} id={i}>
                  {enterSymbol[i] ? <Tool src={enter} /> : null}
                  {pauseSymbol[i] ? <Tool src={pause} /> : null}
                  {mouseSymbol[i] ? <Tool src={mouse} /> : null}
                  {slashSymbol[i] ? <Tool src={slash} /> : null}
                  {word}
                </PlayedText>
              ) : (
                <Text onClick={clickWord} key={i} id={i}>
                  {enterSymbol[i] ? <Tool src={enter} /> : null}
                  {pauseSymbol[i] ? <Tool src={pause} /> : null}
                  {mouseSymbol[i] ? <Tool src={mouse} /> : null}
                  {slashSymbol[i] ? <Tool src={slash} /> : null}
                  {word}
                </Text>
              )
            )}
          </ScriptContainer>
          <div>
            <button onClick={start}>start</button>
            <button onClick={stop}>stop</button>
            <button onClick={reset}>reset</button>
          </div>
        </div>
        {/* <Link to="/presentation/practice">연습 시작</Link> */}
      </Container>
    </>
  );
};

export default Speech;
