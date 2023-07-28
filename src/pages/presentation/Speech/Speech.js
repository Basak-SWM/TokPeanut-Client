import React, { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import WaveSurfer from "wavesurfer.js";
import mp3 from "../mp3.mp3";
import stt from "../stt.json";
import * as s from "./SpeechStyle";
import Pagination from "../Pagination/Pagination";

import highlight from "../../../image/icons/highlight.png";
import faster from "../../../image/icons/faster.png";
import slower from "../../../image/icons/slower.png";
import edit from "../../../image/icons/edit.png";
import enter from "../../../image/icons/enter.png";
import pause from "../../../image/icons/pause.png";
import mouse from "../../../image/icons/mouse.png";
import slash from "../../../image/icons/slash.png";
import erase from "../../../image/icons/erase.png";

import styled from "@emotion/styled";
import { createGlobalStyle } from "styled-components";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import { Box, IconButton, Button } from "@mui/material";
import ToolBarPC from "../../script/ToolbarPC";
import PageBtn from "../../script/PageBtn";
import ScriptBar from "../../script/ScriptBar";
import Tooltip from "@mui/material/Tooltip";
import ToolBarMo from "../../script/ToolbarMo";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FilledBtn from "../../button/FilledBtn";

import Nav from "../../layout/Nav";
import theme from "../../../style/theme";

import AiFeedbackModal from "../../modal/AiFeedbackModal";
import StatisticsModal from "../../modal/StatisticsModal";

// custom hook (timer)
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
  return { count, start, stop, reset, setCount };
};

const Speech = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "Pretendard",
    },
    palette: {
      primary: {
        main: "#FF7134",
      },
    },
  });
  const [isDone, setIsDone] = useState(false); // 서버가 보내주는 결과에 따라 분석 중인지 아닌지 파악

  // tool bar
  const [cursor, setCursor] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState(NaN); // 커서 관리를 위한 현재 선택된 기호 인덱스
  // 사용자 기호
  // const symbols = [
  //   highlight,
  //   faster,
  //   slower,
  //   edit,
  //   enter,
  //   pause,
  //   mouse,
  //   slash,
  //   erase,
  // ];

  const symbols = [
    { name: "강조", src: "/img/script/toolbar/color/pencil1.svg" },
    { name: "빠르게", src: "/img/script/toolbar/color/pencil2.svg" },
    { name: "느리게", src: "/img/script/toolbar/color/pencil3.svg" },
    { name: "수정", src: "/img/script/toolbar/pencil.svg" },
    { name: "엔터", src: "/img/script/toolbar/down-left.svg" },
    { name: "쉬기", src: "/img/script/toolbar/pause.svg" },
    { name: "클릭", src: "/img/script/toolbar/mouse.svg" },
    { name: "끊어읽기", src: "/img/script/toolbar/slash.svg" },
    { name: "지우개", src: erase },
  ];

  // 기호 클릭시 selectedSymbol을 해당 기호 이미지로 변경 -> 커서 변경
  // 한 번 더 클릭시 기본 커서로 변경
  const clickTool = (i) => {
    // const selectedSymbolIdx = e.target.id;
    const selectedSymbolIdx = i;

    if (selectedSymbol) {
      setSelectedSymbol(NaN);
    } else {
      setSelectedSymbol(selectedSymbolIdx);
    }
    // 커서 변경
    selectedSymbol ? setCursor("") : setCursor(symbols[selectedSymbolIdx].src);
  };

  // stt 결과 형식에 맞게 데이터 파싱
  const text = stt.segments.flatMap((seg) => seg.words.map((w) => w[2]));
  const started = stt.segments.flatMap((seg) =>
    seg.words.map((w) => w[0] * 0.01)
  );
  const ended = stt.segments.flatMap((seg) =>
    seg.words.map((w) => w[1] * 0.01)
  );
  const duration = stt.segments.flatMap((seg) =>
    seg.words.map((w) => (w[1] - w[0]) * 0.001)
  );

  // 각 기호의 렌더링 여부
  // 하나의 {객체}로 합치기
  // option으로 <Text "도심은", option={} />
  // useReduce로 묶어보기
  const [enterSymbol, setEnterSymbol] = useState(text.map(() => false));
  const [pauseSymbol, setPauseSymbol] = useState(text.map(() => false));
  const [mouseSymbol, setMouseSymbol] = useState(text.map(() => false));
  const [slashSymbol, setSlashSymbol] = useState(text.map(() => false));
  const [highlighted, setHighlighted] = useState(text.map(() => ""));
  const [edited, setEdited] = useState(text.map(() => null));
  const wordRef = useRef([]);
  // const [edited, setEdited] = useState(text.map(() => false));

  const [waveFormLoaded, setWaveFormLoaded] = useState(false);
  const [waveSurferInstance, setWaveSurferInstance] = useState(null);

  const { count, start, stop, reset, setCount } = useCounter(0, 100); //0.1초 단위 타이머

  const clickWord = (e) => {
    const selectedWordIdx = e.currentTarget.id; // 클릭된 단어 인덱스
    wordRef.current[selectedWordIdx].focus();

    switch (selectedSymbol) {
      // 기호 표시
      case 0:
        highlighted[selectedWordIdx] = "yellow";
        setHighlighted([...highlighted]);
        break;
      case 1:
        highlighted[selectedWordIdx] = "pink";
        setHighlighted([...highlighted]);
        break;
      case 2:
        highlighted[selectedWordIdx] = "yellowgreen";
        setHighlighted([...highlighted]);
        break;
      case 3:
        edited[selectedWordIdx] = edited[selectedWordIdx]
          ? edited[selectedWordIdx]
          : text[selectedWordIdx]; // 원래 단어로 초기화
        // console.log(e.target, selected.current);
        // selected.current.focus();
        setEdited([...edited]);

        // console.log(document.querySelectorAll(".edited"));

        break;
      case 4:
        enterSymbol[selectedWordIdx] = true;
        setEnterSymbol([...enterSymbol]);
        break;
      case 5:
        pauseSymbol[selectedWordIdx] = true;
        setPauseSymbol([...pauseSymbol]);
        break;
      case 6:
        mouseSymbol[selectedWordIdx] = true;
        setMouseSymbol([...mouseSymbol]);
        break;
      case 7:
        slashSymbol[selectedWordIdx] = true;
        setSlashSymbol([...slashSymbol]);
        break;
      case 8:
        enterSymbol[selectedWordIdx] = false;
        setEnterSymbol([...enterSymbol]);
        pauseSymbol[selectedWordIdx] = false;
        setPauseSymbol([...pauseSymbol]);
        mouseSymbol[selectedWordIdx] = false;
        setMouseSymbol([...mouseSymbol]);
        slashSymbol[selectedWordIdx] = false;
        setSlashSymbol([...slashSymbol]);
        highlighted[selectedWordIdx] = "";
        setHighlighted([...highlighted]);
        edited[selectedWordIdx] = null;
        // edited[selectedWordIdx] = false;
        setEdited([...edited]);
        break;
      // 재생 바 조절
      default:
        waveSurferInstance.setCurrentTime(started[selectedWordIdx] * 0.1);
        setCount(started[selectedWordIdx]);
        break;
    }
  };

  const onReset = () => {
    reset();
    waveSurferInstance.setCurrentTime(0);
    waveSurferInstance.pause();
  };

  // 파형
  const wavesurferRef = useRef(null);
  const playButton = useRef(null);

  useEffect(() => {
    let wavesurfer = null;
    const initWaveSurfer = () => {
      wavesurfer = WaveSurfer.create({
        container: wavesurferRef.current,
        audioRate: 1, // 재생 속도 (default 1)
        barHeight: 1, // 막대 높이 (default 1)
        barWidth: 3, // 막대 넓이
        barGap: 1,
        cursorColor: "#ddd5e9",
        cursorWidth: 3,
        fillParent: false, // 부모 요소를 가득 채울지, mixPxPerSec 옵션에 따를지
        height: 64, // 웨이브 폼 전체의 높이
        hideScrollbar: true, // 가로 스크롤바 표시 여부
        minPxPerSec: 50, // 오디오 파일의 1초당 렌더링 될 픽셀 수의 최솟값. zoom level
        normalize: true, // true면 가장 큰 막대의 길이에 비례하여 막대 높이 설정
        progressColor: "#dd5e98", // 커서 왼쪽의 파형 색상
        responsive: false, // 웨이브 폼이 부모 요소보다 길어서 넘치는 경우 스크롤바 or 줄여서 렌더링
        waveColor: "#ff4e00", // 커서 오른쪽의 파형 색상
        interact: false, // 파형 클릭 불가능
        splitChannels: false, // 두 줄로 출력
        autoScroll: true, // 자동 스크롤
        scrollParent: true,
      });
      wavesurfer.load(mp3);
      setWaveSurferInstance(wavesurfer);

      // 플레이/퍼즈 때 버튼 텍스트 변경
      wavesurfer.on("play", () => {
        start();
        playButton.current.textContent = "pause";
      });
      wavesurfer.on("pause", () => {
        stop();
        playButton.current.textContent = "play";
      });

      wavesurfer.on("ready", () => {
        setWaveFormLoaded(true);
        playButton.current.addEventListener("click", () => {
          wavesurfer.playPause();
        });
      });
    };

    const handleUserGesture = () => {
      if (!wavesurfer) {
        initWaveSurfer();

        document.removeEventListener("click", handleUserGesture);
        console.log("remove click event listener");
      }
    };
    document.addEventListener("click", handleUserGesture);
    return () => {
      if (wavesurfer) {
        wavesurfer.destroy();
      }
      document.removeEventListener("click", handleUserGesture);
    };
  }, []);

  const handleBlur = useCallback(
    (e, i) => {
      let updated = [...edited];
      if (e.target.innerText === text[i]) {
        updated[i] = null;
        // edited[i] = false;
      } else if (e.target.innerText.trim() === "") {
        updated[i] = "-";
      } else {
        updated[i] = e.target.innerText;
      }
      setEdited(updated);
    },
    [edited, text]
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Nav />
        <Container cursor={cursor}>
          {
            // 툴바
            isDone ? (
              <Activate>
                <ToolBarWrap cursor={cursor}>
                  <ul className="activate">
                    {symbols.map((c, i) => (
                      <li>
                        <Button
                          className="color"
                          id="color1"
                          onClick={() => {
                            clickTool(i);
                          }}
                        >
                          <img src={c.src} />
                          <p>{c.name}</p>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </ToolBarWrap>
              </Activate>
            ) : (
              <Disabled>
                <ToolBarWrap>
                  <ul className="disabled">
                    {symbols.map((c, i) => (
                      <li>
                        <Button disabled>
                          <img src={c.src} />
                          <p>{c.name}</p>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </ToolBarWrap>
              </Disabled>
            )
          }

          {/* <s.Tools>
            {symbols.map((c, i) => (
              <s.ToolKit
                className="word"
                key={i}
                id={i}
                src={c}
                cursor={cursor}
                onClick={clickTool}
              />
            ))}
            {isDone ? null : <s.DisableBox />}
          </s.Tools> */}

          <Script>
            {/* <s.ScriptContainer> */}
            <Screen>
              <TextArea>
                <p>
                  {isDone ? (
                    text.map((word, i) => (
                      <s.Text
                        played={
                          started[i] < count
                            ? count < ended[i]
                              ? "playing"
                              : "played"
                            : "not played"
                        }
                        duration={duration[i]}
                        color={highlighted[i]}
                        continued={highlighted[i] === highlighted[i + 1]} // 형광펜이 연달아 적용 되는지
                        onClick={clickWord}
                        key={i}
                        id={i}
                        edited={edited[i] ? true : false}
                      >
                        {enterSymbol[i] ? (
                          <>
                            <s.Tool src={enter} />
                            <br />
                          </>
                        ) : null}
                        {pauseSymbol[i] ? <s.Tool src={pause} /> : null}
                        {mouseSymbol[i] ? <s.Tool src={mouse} /> : null}
                        {slashSymbol[i] ? <s.Tool src={slash} /> : null}
                        <span>
                          <span
                            ref={(el) => (wordRef.current[i] = el)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault(); // 줄바꿈 방지
                              }
                            }}
                            onBlur={(e) => {
                              handleBlur(e, i);
                            }}
                            onFocus={(e) => {
                              console.log("focused ", e.target);
                            }}
                            // contentEditable={cursor === edit} // 현재 커서가 수정펜일 때만 수정 모드
                            contentEditable={selectedSymbol === 3} // 현재 커서가 수정펜일 때만 수정 모드
                            edited={edited[i]}
                            spellCheck={false}
                            suppressContentEditableWarning={true} // warning 무시
                          >
                            {edited[i] ? edited[i] : word}
                          </span>
                          {edited[i] ? (
                            <s.OriginalText contentEditable={false}>
                              수정 전: {word}
                            </s.OriginalText>
                          ) : null}
                        </span>
                      </s.Text>
                    ))
                  ) : (
                    <>
                      분석중...
                      <button
                        onClick={() => {
                          setIsDone(true);
                        }}
                      >
                        분석 완료하기
                      </button>
                    </>
                  )}
                </p>
              </TextArea>
              {/* </s.ScriptContainer> */}
            </Screen>

            <div className="sound-wave">
              {waveFormLoaded ? null : <s.LoadingBox>loading...</s.LoadingBox>}
              <s.WaveWrapper ref={wavesurferRef} />
            </div>

            <PC>
              <ScriptBarWrap>
                {isDone ? (
                  <ul className="btn-wrap activate">
                    <li>
                      <FilledBtn text={"코치 연결하기"} />
                      <Link to="/presentation/practice">
                        <FilledBtn text={"연습 시작하기"} />
                      </Link>
                    </li>
                    <li>
                      <PlayBtn variant="contained" ref={playButton}>
                        <PlayArrowIcon />
                      </PlayBtn>
                      {/* <FilledBtn text={"Reset"} onClick={onReset} /> */}
                      <PlayBtn variant="contained" onClick={onReset}>
                        R
                      </PlayBtn>
                    </li>
                    <li>
                      <FilledBtn text={"X 1"} />
                      <StatisticsModal />
                      <AiFeedbackModal />
                    </li>
                  </ul>
                ) : (
                  <ul className="btn-wrap">
                    <li>
                      <FilledBtn text={"코치 연결하기"} state={"disabled"} />
                      <FilledBtn text={"연습 시작하기"} state={"disabled"} />
                    </li>
                    <li>
                      <PlayBtn variant="contained" disabled>
                        <PlayArrowIcon />
                      </PlayBtn>
                      <PlayBtn variant="contained" disabled>
                        R
                      </PlayBtn>
                    </li>
                    <li>
                      <FilledBtn text={"X 1"} state={"disabled"} />
                      <FilledBtn text={"통계보기"} state={"disabled"} />
                      <FilledBtn text={"AI 피드백"} state={"disabled"} />
                    </li>
                  </ul>
                )}
              </ScriptBarWrap>
            </PC>

            {/* <div>
              <button ref={playButton} disabled={!isDone}>
                play
              </button>
              <button onClick={onReset} disabled={!isDone}>
                reset
              </button>
            </div>
            {isDone ? <Link to="/presentation/practice">연습 시작</Link> : null}
            <div>count: {count}</div> */}
          </Script>

          <Pagination />
        </Container>
      </ThemeProvider>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
    body{
        background-color: #FAFAFA;
    }
`;
const Container = styled(Box)`
  cursor: url(${(props) => props.cursor}) 50 50, auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  @media ${() => theme.device.mobile} {
    flex-direction: column-reverse;
    width: 90%;
    margin: 0 auto;
    padding-bottom: 3rem;
    height: auto;
  }
`;

const Script = styled(Box)`
  width: 100%;
  height: 80vh;
  margin: 13rem 10rem 0 5rem;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media ${() => theme.device.mobile} {
    margin: 0;
    height: auto;
  }
`;

const Screen = styled(Box)`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  .sound-wave {
    margin-bottom: 3rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 40%;
    }
  }
  @media ${() => theme.device.desktop2} {
  }
  @media ${() => theme.device.mobile} {
    .sound-wave {
      img {
        width: 80%;
      }
    }
  }
`;

const TextArea = styled(Box)`
  padding: 3rem;
  p {
    /* height: fit-content; */
    max-height: 420px;
    overflow-y: scroll;
    padding: 3rem;
    background-color: #f5f5f5;
    font-size: 2rem;
    line-height: 200%;
    color: #3b3b3b;
    .pencil3 {
      background-color: #cbf5ca;
    }
    .pencil2 {
      background-color: #ffdefc;
    }
    .pencil1 {
      background-color: #fff2c2;
    }
  }
  @media ${() => theme.device.mobile} {
    padding: 2rem;
    p {
      height: auto;
      font-size: 1.8rem;
    }
  }
`;

const Disabled = styled(Box)`
  height: 100vh;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  left: 0;
  .disabled {
    background-color: #e0e0e0;
  }
  @media ${() => theme.device.mobile} {
    display: none;
  }
`;

const Activate = styled(Box)`
  height: 100vh;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  left: 0;
  @media ${() => theme.device.mobile} {
    display: none;
  }
`;

// tool bar
const ToolBarWrap = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & > ul {
    margin-top: 5rem;
    background-color: #fff;
    .select {
      background-color: #ffe9d9;
      #color1 {
        p {
          color: #ffe609;
        }
      }
      #color2 {
        p {
          color: #ff5eef;
        }
      }
      #color3 {
        p {
          color: #0ff80a;
        }
      }
      p {
        font-weight: bold;
        color: #838383;
      }
    }
    li:last-of-type {
      border-bottom: none;
    }
    li {
      width: 10rem;
      height: 10rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      p {
        font-size: 1.4rem;
        color: #aeaeae;
        line-height: 150%;
      }
      button {
        cursor: url(${(props) => props.cursor}) 50 50, auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        img {
          width: 2rem;
          height: 2rem;
          margin-bottom: 1rem;
        }
      }
    }
  }
  .activate {
    li {
      button:not(.color) {
        img {
          filter: invert(53%) sepia(0%) saturate(0%) hue-rotate(352deg)
            brightness(98%) contrast(89%);
        }
      }
    }
  }

  @media ${() => theme.device.desktop} {
    & > ul {
      li {
        width: 8rem;
        height: 8rem;
      }
    }
  }
  @media ${() => theme.device.desktop2} {
    & > ul {
      li {
        width: 7rem;
        height: 7rem;
      }
    }
  }
`;

// 하단 바
const PC = styled(Box)`
  width: 100%;
  @media ${() => theme.device.mobile} {
    display: none;
  }
`;
const Mobile = styled(Box)`
  display: none;
  width: 100%;
  @media ${() => theme.device.mobile} {
    display: block;
  }
`;

const ScriptBarWrap = styled(Box)`
  background-color: #ff7134;
  width: 100%;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  .activate {
    button {
      svg {
        color: #ff7134 !important;
      }
    }
  }
  .btn-wrap {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    width: 65%;
    li {
      display: flex;
      align-items: center;
    }
    button {
      font-size: 1.6rem;
      padding: 1rem 3rem;
      margin-right: 2rem;
    }
    .Mui-disabled {
      background-color: #e0e0e0;
    }
  }
  @media ${() => theme.device.desktop} {
    .btn-wrap {
      width: 100%;
    }
  }
  @media ${() => theme.device.desktop2} {
    .btn-wrap {
      button {
        font-size: 1.4rem;
        padding: 0.5rem 2rem;
      }
    }
  }
  @media ${() => theme.device.mobile} {
    height: 20rem;
    padding: 2rem 0;
    .btn-wrap {
      li {
        margin: 0;
      }
      button {
        margin-bottom: 1rem;
      }
      button:last-of-type {
        margin-bottom: 1rem;
      }
      li:last-of-type {
        width: 100%;
        margin-top: 1rem;
        padding: 0 5%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

const PlayBtn = styled(IconButton)`
  width: 5rem;
  height: 5rem;
  padding: 0 !important;
  background-color: #fff;
  &:hover {
    background-color: #fff;
  }
  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
  @media ${() => theme.device.desktop2} {
    width: 3.5rem;
    height: 3.5rem;
    svg {
      width: 2rem;
      height: 2rem;
    }
  }
  @media ${() => theme.device.mobile} {
    width: 5rem;
    height: 5rem;
    margin-bottom: 0 1rem 0 0 !important;
    svg {
      width: 3rem;
      height: 3rem;
    }
  }
`;

export default Speech;
