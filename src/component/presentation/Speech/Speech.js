import React, { useState, useRef, useCallback, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import WaveSurfer from "wavesurfer.js";
import mp3 from "../mp3.mp3";
// import stt from "../stt.json";
import * as s from "./SpeechStyle";
import Pagination from "../Pagination/Pagination";
import qs from "qs";
import axios from "axios";
import api from "../../../component/api";

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
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import FilledBtn from "../../button/FilledBtn";

import Nav from "../../layout/Nav";
import theme from "../../../style/theme";

import AiFeedbackModal from "../../modal/AiFeedbackModal";
import StatisticsModal from "../../modal/StatisticsModal";

// import peanut_run from "../../../image/peanut_run.png";
import peanut_run from "../../../image/peanut_run.png";

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
  const location = useLocation();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const presentation_id = query.presentation_id;
  const speech_id = query.speech_id;
  const navigate = useNavigate();
  const [audio, setAudio] = useState(null);

  const [correction, setCorrection] = useState({
    PAUSE_TOO_LONG: new Set(),
    PAUSE_TOO_SHORT: new Set(),
    // TOO_FAST: new Set(),
    // startFast: new Set(),
    // TOO_SLOW: new Set(),
    // startSlow: new Set(),
  });
  const getCorrection = useCallback(async (url) => {
    try {
      const res = await axios.get(url);
      console.log("correction response:", res);
      let correctionList = JSON.parse(res.data);
      const correction = {
        PAUSE_TOO_LONG: new Set(correctionList.PAUSE_TOO_LONG),
        PAUSE_TOO_SHORT: new Set(correctionList.PAUSE_TOO_SHORT),
        // TOO_FAST: new Set(
        //   correctionList.TOO_FAST.map((seg) => {
        //     let fastSeg = [];
        //     for (let i = seg[0]; i <= seg[1]; i++) {
        //       fastSeg.push(i);
        //     }
        //     return fastSeg;
        //   }).flat()
        // ),
        // startFast: new Set(correctionList.TOO_FAST.map((seg) => seg[0])),
        // TOO_SLOW: new Set(
        //   correctionList.TOO_SLOW.map((seg) => {
        //     let slowSeg = [];
        //     for (let i = seg[0]; i <= seg[1]; i++) {
        //       slowSeg.push(i);
        //     }
        //     return slowSeg;
        //   }).flat()
        // ),
        // startSlow: new Set(correctionList.TOO_SLOW.map((seg) => seg[0])),
      };
      setCorrection(correction);
    } catch (err) {
      console.log("🩸correction error:", err);
    }
  }, []);
  const [LPM, setLPM] = useState({
    WINDOW_SIZE: null,
    speed_list: [],
  });
  const getLPM = useCallback(async (url) => {
    try {
      const res = await axios.get(url);
      console.log("LPM response:", res);
      const LPM = JSON.parse(res.data);
      setLPM(LPM);
    } catch (err) {
      console.log("🩸LPM error:", err);
    }
  }, []);

  // stt 결과 가져오기
  const getSTT = useCallback(async (url) => {
    try {
      const res = await axios.get(url);
      // console.log("stt response:", res);
      const stt = JSON.parse(res.data);
      initSTT(stt);
    } catch (err) {
      console.log("🩸stt error:", err);
    }
  }, []);

  const [statistics, setStatistics] = useState({
    hertz: null,
    lpm: null,
    pause: null,
  });
  const getStatistics = useCallback(
    async (HERZ, LPM, PAUSE) => {
      try {
        const hertzRes = await axios.get(HERZ);
        statistics.hertz = (hertzRes.data * 1).toFixed(1);
        // statistics.hertz = 100;

        const lpmRes = await axios.get(LPM);
        statistics.lpm = (lpmRes.data * 1).toFixed(1);

        const pauseRes = await axios.get(PAUSE);
        statistics.pause = (pauseRes.data * 1).toFixed(1);

        setStatistics(statistics);
      } catch (err) {
        console.log("🩸statistics error:", err);
      }
    },
    [statistics]
  );
  // audio 가져와서 변환
  const getAudio = useCallback(async (audioUrl) => {
    try {
      const res = await axios.get(audioUrl, {
        responseType: "blob",
      });
      // console.log("audio response:", res);
      const blob = new Blob([res.data]);
      setAudio(blob);
    } catch (err) {
      console.log("🩸audio error:", err);
    }
  }, []);
  // full audio url 가져오기
  const getSpeech = useCallback(async () => {
    let res = null;
    try {
      res = await api.get(
        `/presentations/${presentation_id}/speeches/${speech_id}`
      );
      // console.log("speech response:", res);
      // 여기서 사용자 기호 초기화
      initUserSymbols(res.data.userSymbol);
      const audioUrl = res.data.fullAudioS3Url;
      getAudio(audioUrl);
    } catch (err) {
      console.log("🩸speech error:", err);
    }
  }, [presentation_id, speech_id, getAudio]);

  // 분석 결과 url 가져오기
  const getResult = useCallback(async () => {
    let res = null;
    try {
      res = await api.get(
        `/presentations/${presentation_id}/speeches/${speech_id}/analysis-records`
      );
      console.log("분석 결과 url response:", res, res.status);
      // 분석 완료 여부 확인
      if (res.status === 200) {
        setIsDone(true);
        getSpeech();
        getSTT(res.data.STT);
        getCorrection(res.data.SPEECH_CORRECTION); // 휴지 긺/짧음 가져오기
        getLPM(res.data.LPM);
        // 음높이(HERTZ_AVG), 속도(LPM_AVG), 휴지(PAUSE_RATIO) 가져오기
        getStatistics(
          res.data.HERTZ_AVG,
          res.data.LPM_AVG,
          res.data.PAUSE_RATIO
        );
      } else {
        console.log("분석 중");
      }
    } catch (err) {
      console.log("🩸분석 결과 url error:", err);
    }
    return res.status;
  }, [
    presentation_id,
    speech_id,
    getSTT,
    getCorrection,
    getStatistics,
    getSpeech,
  ]);

  // 스크립트를 위한 스피치 정보 조회
  useEffect(() => {
    // let polling = setInterval(async () => {
    //   const status = await getResult();
    //   if (status === 200) {
    //     clearInterval(polling);
    //   }
    // }, 3000);

    const polling = async () => {
      const status = await getResult();
      if (status === 200) {
        clearInterval(repeat);
      }
    };
    polling(); // 최초(즉시)실행
    const repeat = setInterval(polling, 3000);

    // getSpeech();
  }, [presentation_id, speech_id, getResult]);

  const [text, setText] = useState([]);
  const [started, setStarted] = useState([]);
  const [ended, setEnded] = useState([]);
  const [duration, setDuration] = useState([]);
  // 각 기호의 렌더링 여부
  // 하나의 {객체}로 합치기
  // option으로 <Text "도심은", option={} />
  // useReduce로 묶어보기

  const [enterSymbol, setEnterSymbol] = useState([]);
  const [pauseSymbol, setPauseSymbol] = useState([]);
  const [mouseSymbol, setMouseSymbol] = useState([]);
  const [slashSymbol, setSlashSymbol] = useState([]);
  const [highlighted, setHighlighted] = useState([]);
  const [edited, setEdited] = useState([]);
  const initUserSymbols = (userSymbol) => {
    const symbols = JSON.parse(userSymbol);
    // console.log("user symbols:", symbols);

    if (!symbols) return;

    setEnterSymbol(symbols.enter);
    setPauseSymbol(symbols.pause);
    setMouseSymbol(symbols.mouse);
    setSlashSymbol(symbols.slash);
    setHighlighted(symbols.highlight);
    setEdited(symbols.edit);
  };

  const wordRef = useRef([]);

  const initSTT = (stt) => {
    setText(stt.segments.flatMap((seg) => seg.words.map((w) => w[2])));
    setStarted(
      stt.segments.flatMap((seg) => seg.words.map((w) => w[0] * 0.01))
    );
    setEnded(stt.segments.flatMap((seg) => seg.words.map((w) => w[1] * 0.01)));
    setDuration(
      stt.segments.flatMap((seg) => seg.words.map((w) => (w[1] - w[0]) * 0.001))
    );
  };

  const patchUserSymbol = useCallback(
    async (
      enterSymbol,
      pauseSymbol,
      mouseSymbol,
      slashSymbol,
      highlighted,
      edited
    ) => {
      if (!isDone) return;
      try {
        const symbolObj = {
          enter: enterSymbol,
          pause: pauseSymbol,
          mouse: mouseSymbol,
          slash: slashSymbol,
          highlight: highlighted,
          edit: edited,
        };
        const res = await api.patch(
          `/presentations/${presentation_id}/speeches/${speech_id}`,
          {
            params: {
              "presentation-id": presentation_id,
              "speech-id": speech_id,
            },
            userSymbol: JSON.stringify(symbolObj),
          }
        );
        // console.log("patch user symbol response:", res);
      } catch (err) {
        console.log("🩸patch user symbol error:", err);
      }
    },
    [isDone, presentation_id, speech_id]
  );

  // tool bar
  const [cursor, setCursor] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState(NaN); // 커서 관리를 위한 현재 선택된 기호 인덱스

  const symbols = [
    { name: "강조", src: "/img/script/toolbar/color/pencil1.svg" },
    { name: "빠르게", src: "/img/script/toolbar/color/pencil2.svg" },
    { name: "느리게", src: "/img/script/toolbar/color/pencil3.svg" },
    { name: "수정", src: "/img/script/toolbar/edit.svg" },
    { name: "엔터", src: "/img/script/toolbar/down-left.svg" },
    { name: "쉬기", src: "/img/script/toolbar/pause.svg" },
    { name: "클릭", src: "/img/script/toolbar/mouse.svg" },
    { name: "끊어읽기", src: "/img/script/toolbar/slash.svg" },
    { name: "지우개", src: "/img/script/toolbar/eraser.svg" },
  ];

  const correctionIcons = [
    { name: "휴지 긺", src: "/img/script/space_long.svg" },
    { name: "휴지 짧음", src: "/img/script/space_short.svg" },
  ];

  // 기호 클릭시 selectedSymbol을 해당 기호 이미지로 변경 -> 커서 변경
  // 한 번 더 클릭시 기본 커서로 변경
  const clickTool = (i) => {
    // const selectedSymbolIdx = e.target.id;
    const selectedSymbolIdx = i;
    console.log(i);

    if (!isNaN(selectedSymbol)) {
      setSelectedSymbol(NaN);
    } else {
      setSelectedSymbol(selectedSymbolIdx);
    }
    // 커서 변경
    !isNaN(selectedSymbol)
      ? setCursor("")
      : setCursor(symbols[selectedSymbolIdx].src);
  };

  const [waveFormLoaded, setWaveFormLoaded] = useState(false);
  const [waveSurferInstance, setWaveSurferInstance] = useState(null);

  const { count, start, stop, reset, setCount } = useCounter(0, 100); //0.1초 단위 타이머

  const clickWord = (e) => {
    if (!waveFormLoaded) return;
    const selectedWordIdx = e.currentTarget.id; // 클릭된 단어 인덱스
    wordRef.current[selectedWordIdx].focus();

    switch (selectedSymbol) {
      // 기호 표시
      case 0:
        highlighted[selectedWordIdx] = "rgba(255,255,204)";
        setHighlighted([...highlighted]);
        break;
      case 1:
        highlighted[selectedWordIdx] = "rgb(255, 204, 255)";
        setHighlighted([...highlighted]);
        break;
      case 2:
        highlighted[selectedWordIdx] = "rgb(204, 255, 204)";
        setHighlighted([...highlighted]);
        break;
      case 3:
        edited[selectedWordIdx] = edited[selectedWordIdx]
          ? edited[selectedWordIdx]
          : text[selectedWordIdx]; // 원래 단어로 초기화
        setEdited([...edited]);
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
    // if (!isNaN(selectedSymbol)) {
    //   patchUserSymbol();
    //   console.log("클릭: ", edited[selectedWordIdx]);
    // }
  };

  const onReset = () => {
    reset();
    waveSurferInstance.setCurrentTime(0);
    waveSurferInstance.pause();
  };

  // 파형
  const wavesurferRef = useRef(null);
  const playButton = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (audio) {
      let wavesurfer = null;
      const initWaveSurfer = () => {
        wavesurfer = WaveSurfer.create({
          container: wavesurferRef.current,
          audioRate: 1, // 재생 속도 (default 1)
          barHeight: 1, // 막대 높이 (default 1)
          barWidth: 2, // 막대 넓이
          barGap: 5,
          cursorColor: "#ff4e00",
          cursorWidth: 2,
          fillParent: true, // 부모 요소를 가득 채울지, mixPxPerSec 옵션에 따를지
          height: 64, // 웨이브 폼 전체의 높이
          hideScrollbar: true, // 가로 스크롤바 표시 여부
          minPxPerSec: 50, // 오디오 파일의 1초당 렌더링 될 픽셀 수의 최솟값. zoom level
          normalize: true, // true면 가장 큰 막대의 길이에 비례하여 막대 높이 설정
          progressColor: "#F86F03", // 커서 왼쪽의 파형 색상
          responsive: false, // 웨이브 폼이 부모 요소보다 길어서 넘치는 경우 스크롤바 or 줄여서 렌더링
          waveColor: "#3b3b3b", // 커서 오른쪽의 파형 색상
          interact: false, // 파형 클릭 불가능
          splitChannels: false, // 두 줄로 출력
          autoScroll: true, // 자동 스크롤
          scrollParent: true,
        });
        // wavesurfer.load(mp3);
        wavesurfer.loadBlob(audio);

        setWaveSurferInstance(wavesurfer);
        // 플레이/퍼즈 때 버튼 텍스트 변경
        wavesurfer.on("play", () => {
          start();
          // playButton.current.textContent = "pause";
          setPlaying(true);
        });
        wavesurfer.on("pause", () => {
          stop();
          // playButton.current.textContent = "play";
          setPlaying(false);
        });

        wavesurfer.on("ready", () => {
          console.log("waveform ready");
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
    } else {
      console.log("audio not loaded");
    }
  }, [audio]);

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
      // patchUserSymbol();
    },
    [edited, text]
  );
  useEffect(() => {
    patchUserSymbol(
      enterSymbol,
      pauseSymbol,
      mouseSymbol,
      slashSymbol,
      highlighted,
      edited
    );
  }, [
    enterSymbol,
    pauseSymbol,
    mouseSymbol,
    slashSymbol,
    highlighted,
    edited,
    // patchUserSymbol,
  ]);

  const createSpeech = async () => {
    let res = null;
    try {
      res = await api.post(`/presentations/${presentation_id}/speeches`, {
        params: { "presentation-id": presentation_id },
        referenceSpeechId: speech_id,
      });
      // console.log("new speech response:", res);
    } catch (err) {
      console.log("🩸new speech error: ", err);
    }
    // 새로 생성된 speech의 id로 practice 페이지로 이동
    navigate(
      // `/presentation/practice?presentation_id=${presentation_id}&speech_id=${res.data.id}&prev_speech=${speech_id}`
      `/presentation/practice?presentation_id=${presentation_id}&speech_id=${res.data.id}`
    );
  };

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
                      <li key={i}>
                        <Button
                          className="color"
                          id="color1"
                          onClick={() => {
                            clickTool(i);
                          }}
                        >
                          <img src={c.src} alt={c.name} />
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
                      <li key={i}>
                        <Button disabled>
                          <img
                            src={
                              i < 3 ? "/img/script/toolbar/pencil.svg" : c.src
                            }
                            alt="symbol"
                          />
                          <p>{c.name}</p>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </ToolBarWrap>
              </Disabled>
            )
          }

          <Script>
            <Screen>
              {isDone ? (
                <TextArea>
                  <p>
                    {text.map((word, i) => (
                      <span key={i}>
                        <Symbol>
                          {enterSymbol[i] && (
                            <>
                              <img src={symbols[4].src} alt="enter" />
                              <br />
                            </>
                          )}

                          {correction.PAUSE_TOO_LONG &&
                            correction.PAUSE_TOO_LONG.has(i - 1) && (
                              <img
                                src={correctionIcons[0].src}
                                alt="pause too long"
                                className="correction pause_too_long"
                              />
                            )}
                          {correction.PAUSE_TOO_SHORT &&
                            correction.PAUSE_TOO_SHORT.has(i - 1) && (
                              <img
                                src={correctionIcons[1].src}
                                alt="pause too short"
                                className="correction pause_too_short"
                              />
                            )}
                        </Symbol>
                        <span
                          style={{
                            display: "inline-flex",
                            flexDirection: "column",
                          }}
                        >
                          <CorrectionLine
                            // $status={
                            //   correction.TOO_FAST.has(i)
                            //     ? "fast"
                            //     : correction.TOO_SLOW.has(i)
                            //     ? "slow"
                            //     : null
                            // }
                            $status={
                              LPM.speed_list[i] > 0
                                ? "fast"
                                : LPM.speed_list[i] < 0
                                ? "slow"
                                : null
                            }
                            $opacity={
                              LPM.speed_list[i] > 0
                                ? LPM.speed_list[i] / LPM.WINDOW_SIZE
                                : LPM.speed_list[i] < 0
                                ? -(LPM.speed_list[i] / LPM.WINDOW_SIZE)
                                : null
                            }
                          >
                            {/* {correction.startFast.has(i)
                              ? "너무 빨라요"
                              : correction.startSlow.has(i)
                              ? "너무 느려요"
                              : "\u00A0"} */}
                            &nbsp;
                          </CorrectionLine>
                          <s.Text
                            key={i}
                            $played={
                              started[i] < count
                                ? count < ended[i]
                                  ? "playing"
                                  : "played"
                                : "not played"
                            }
                            $duration={duration[i]}
                            color={highlighted[i]}
                            $continued={
                              highlighted[i] === highlighted[i + 1] ? 1 : 0
                            } // 형광펜이 연달아 적용 되는지
                            onClick={clickWord}
                            id={i}
                            $edited={edited[i] ? 1 : 0}
                          >
                            {pauseSymbol[i] && (
                              <img src={symbols[5].src} alt="pause" />
                            )}
                            {mouseSymbol[i] && (
                              <img src={symbols[6].src} alt="click" />
                            )}
                            {slashSymbol[i] && (
                              <img src={symbols[7].src} alt="slash" />
                            )}
                            <span>
                              <span
                                ref={(el) => (wordRef.current[i] = el)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault(); // 줄바꿈 방지
                                    handleBlur(e, i);
                                  }
                                }}
                                onBlur={(e) => {
                                  handleBlur(e, i);
                                }}
                                contentEditable={selectedSymbol === 3} // 현재 커서가 수정펜일 때만 수정 모드
                                edited={edited[i]}
                                spellCheck={false}
                                suppressContentEditableWarning={true} // warning 무시
                              >
                                {edited[i] ? edited[i] : word}
                              </span>
                              {
                                // 수정 전 단어 툴팁
                                edited[i] ? (
                                  <s.OriginalText
                                    contentEditable={false}
                                    $len={word.length + 5}
                                  >
                                    수정 전: {word}
                                  </s.OriginalText>
                                ) : null
                              }
                            </span>
                          </s.Text>
                        </span>
                      </span>
                    ))}
                  </p>
                </TextArea>
              ) : (
                <>
                  <div className="logo-box">
                    {/* <img src={peanut_run} alt="peanut run" /> */}
                  </div>
                  <h1>열심히 분석 중입니다.</h1>
                </>
              )}
            </Screen>
            {/* <div className="sound-wave"> */}
            <WaveContainer>
              {isDone ? (
                waveFormLoaded ? null : (
                  <div className="text">클릭하여 편집을 시작하세요</div>
                )
              ) : (
                <div className="text">analyzing...</div>
              )}
              <s.WaveWrapper
                ref={wavesurferRef}
                $ready={isDone && waveFormLoaded ? 1 : 0}
              />
            </WaveContainer>
            <PC>
              <ScriptBarWrap>
                {isDone ? (
                  <ul className="btn-wrap activate">
                    <li>
                      <FilledBtn text={"코치 연결하기"} />
                      <FilledBtn
                        text={"연습 시작하기"}
                        onClick={createSpeech}
                      />
                    </li>
                    <li>
                      <PlayBtn variant="contained" ref={playButton}>
                        {playing ? <PauseIcon /> : <PlayArrowIcon />}
                      </PlayBtn>
                      <PlayBtn variant="contained" onClick={onReset}>
                        <RestartAltIcon />
                      </PlayBtn>
                    </li>
                    <li>
                      <FilledBtn text={"X 1"} />
                      <StatisticsModal
                        presentation_id={presentation_id}
                        speech_id={speech_id}
                        statistics={statistics}
                      />
                      <AiFeedbackModal
                        presentation_id={presentation_id}
                        speech_id={speech_id}
                      />
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
                        <RestartAltIcon />
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
  /* width: 100%; */
  width: 80vw;
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

const WaveContainer = styled.div`
  height: 64px;
  margin-bottom: 3rem;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff6f4;

  .text {
    width: 100%;
    height: 64px;
    /* background-color: #f5f5f5; */
    /* background-color: rgb(255, 112, 51, 0.2); */
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
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

  .logo-box {
    @keyframes run {
      0% {
        background-position-x: 0px;
      }
      100% {
        background-position-x: -210vh;
      }
    }
    animation: run 0.6s infinite steps(7);
    background-image: url(${peanut_run});
    background-size: 210vh 30vh;
    height: 30vh;
    width: 30vh;
    will-change: transform;
    img {
      /* width: 45rem;
      opacity: 0.8; */
    }
  }

  h1 {
    font-size: 3rem;
    color: #ff7134;
    font-weight: bold;
    margin-top: 2rem;
    text-align: center;
  }
  @media ${() => theme.device.desktop2} {
    .logo-box {
      img {
        width: 30rem;
      }
    }
    h1 {
      font-size: 2.5rem;
    }
  }
  @media ${() => theme.device.mobile} {
    .sound-wave {
      img {
        width: 80%;
      }
    }
    .logo-box {
      img {
        width: 20rem;
      }
    }
  }
`;

const TextArea = styled(Box)`
  width: 90%;
  height: 100%;
  padding: 3rem;
  p {
    /* height: fit-content; */
    /* display: flex; */
    /* align-items: center; */
    flex-direction: row;
    /* height: 420px; */
    height: 50vh;
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
    img {
      width: 1.5rem;
      height: 1.5rem;
      margin: 0 0.5rem 0 0.5rem;
      filter: invert(43%) sepia(98%) saturate(401%) hue-rotate(346deg)
        brightness(101%) contrast(88%);
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

const CorrectionLine = styled.span`
  line-height: 100%;
  background-color: ${(props) =>
    props.$status === "fast"
      ? "#D71313"
      : props.$status === "slow"
      ? "#0D1282"
      : "transparent"};
  opacity: ${(props) => props.$opacity};
  font-size: 1rem;
  font-weight: bold;
  color: white;
`;
const Symbol = styled.span`
  /* margin: auto; */
  height: 3rem;
  vertical-align: bottom;
  padding-bottom: 1rem;
  .correction {
    width: 2.5rem;
    /* margin-left: -5px; */
  }
  .pause_too_long {
    filter: invert(5%) sepia(86%) saturate(7388%) hue-rotate(247deg)
      brightness(103%) contrast(107%);
  }
  .pause_too_short {
    filter: invert(12%) sepia(97%) saturate(5608%) hue-rotate(9deg)
      brightness(90%) contrast(102%);
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
