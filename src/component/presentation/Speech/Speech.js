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
  const [isDone, setIsDone] = useState(false); // 서버가 보내주는 결과에 따라 분석 중인지 아닌지 파악
  console.log("isDone:", isDone);
  // tool bar
  const [cursor, setCursor] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState(NaN); // 커서 관리를 위한 현재 선택된 기호 인덱스
  // 사용자 기호
  const symbols = [
    highlight,
    faster,
    slower,
    edit,
    enter,
    pause,
    mouse,
    slash,
    erase,
  ];

  // 기호 클릭시 selectedSymbol을 해당 기호 이미지로 변경 -> 커서 변경
  // 한 번 더 클릭시 기본 커서로 변경
  const clickTool = (e) => {
    const selectedSymbolIdx = e.target.id;
    if (selectedSymbol) {
      setSelectedSymbol(NaN);
    } else {
      setSelectedSymbol(selectedSymbolIdx);
    }
    // 커서 변경
    selectedSymbol ? setCursor("") : setCursor(symbols[selectedSymbolIdx]);
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

  const [waveFormLoaded, setWaveFormLoaded] = useState(false);
  const [waveSurferInstance, setWaveSurferInstance] = useState(null);

  const { count, start, stop, reset, setCount } = useCounter(0, 100); //0.1초 단위 타이머

  const clickWord = (e) => {
    const selectedWordIdx = e.target.id; // 클릭된 단어 인덱스

    switch (selectedSymbol) {
      // 기호 표시
      case "0":
        highlighted[selectedWordIdx] = "yellow";
        setHighlighted([...highlighted]);
        break;
      case "1":
        highlighted[selectedWordIdx] = "pink";
        setHighlighted([...highlighted]);
        break;
      case "2":
        highlighted[selectedWordIdx] = "yellowgreen";
        setHighlighted([...highlighted]);
        break;
      case "3":
        edited[selectedWordIdx] = text[selectedWordIdx]; // 원래 단어로 초기화
        // console.log("orginal: ", text[selectedWordIdx], e.target.innerText);
        setEdited([...edited]);
        break;
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
      case "8":
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
        setEdited([...edited]);
        break;
      // 재생 바 조절
      default:
        waveSurferInstance.setCurrentTime(started[selectedWordIdx] * 0.1);
        setCount(started[selectedWordIdx]);
        // console.log(
        //   selectedWordIdx,
        //   started[selectedWordIdx],
        //   "wavesurfer:",
        //   waveSurferInstance.getCurrentTime()
        // );
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

  return (
    <>
      <s.Container cursor={cursor}>
        <s.Tools>
          {symbols.map((c, i) => (
            <s.ToolKit
              key={i}
              id={i}
              src={c}
              cursor={cursor}
              onClick={clickTool}
            />
          ))}
          {isDone ? null : <s.DisableBox />}
        </s.Tools>
        <s.Script>
          <div>
            {waveFormLoaded ? null : <s.LoadingBox>loading...</s.LoadingBox>}
            <s.WaveWrapper ref={wavesurferRef} />
          </div>

          <s.ScriptContainer>
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // 줄바꿈 방지
                    }
                  }}
                  onBlur={(e) => {
                    console.log("수정 후: ", e.target.innerText);
                    edited[i] = e.target.innerText; // 수정 후 단어를 edited에 저장
                    setEdited([...edited]);
                  }}
                  key={i}
                  id={i}
                  contentEditable={cursor === edit} // 현재 커서가 수정펜일 때만 수정 모드
                  edited={edited[i]} // 수정이 되었는가?
                  spellCheck={false}
                  suppressContentEditableWarning={true} // warning 무시..
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
                  {edited[i] ? (
                    <>
                      {edited[i]}
                      <s.OriginalText>수정 전: {word}</s.OriginalText>
                    </>
                  ) : (
                    <>{word}</>
                  )}
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
          </s.ScriptContainer>
          <div>
            <button ref={playButton} disabled={!isDone}>
              play
            </button>
            <button onClick={onReset} disabled={!isDone}>
              reset
            </button>
          </div>
          {isDone ? <Link to="/presentation/practice">연습 시작</Link> : null}

          <div>count: {count}</div>
        </s.Script>

        {/* <s.Pagination>
          pagination
          {isDone ? null : <s.DisableBox />}
        </s.Pagination> */}
        <Pagination />
      </s.Container>
    </>
  );
};

export default Speech;
