import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WaveSurfer from "wavesurfer.js";
import MicrophonePlugin from "wavesurfer.js/dist/plugin/wavesurfer.microphone.min.js";
import * as s from "./PracticeStyle";
import axios from "axios";
import qs from "qs";

import styled from "@emotion/styled";
import { createGlobalStyle } from "styled-components";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import { Box, IconButton, Button } from "@mui/material";
import Nav from "../../layout/Nav";
import theme from "../../../style/theme";
import TextField from "@mui/material/TextField";

import FilledBtn from "../../button/FilledBtn";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SolideBtn from "../../button/SolidBtn";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import api from "../../api";

const Practice = ({ isNew }) => {
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

  const location = useLocation();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const presentation_id = query.presentation_id;
  const speech_id = query.speech_id;
  const navigate = useNavigate();

  const [refSpeechId, setRefSpeechId] = useState(null); // 이전 스피치의 id

  // 임시저장된 오디오 세그먼트 가져와서 저장
  const getAudioSegments = async (audioSegmentsUrl) => {
    try {
      for (const url of audioSegmentsUrl) {
        const res = await axios.get(url, { responseType: "blob" });
        // console.log("audio segment: ", res.data);
        segmentRef.current.push(res.data);
      }
    } catch (error) {
      console.error("Error combining audio:", error);
    }
  };

  useEffect(() => {
    getSpeech();
  }, []);
  // 우선 현재 스피치 조회
  // 이전 스피치의 id 받아오기
  // 현재 스피치의 오디오 세그먼트 가져오기
  const getSpeech = async () => {
    try {
      const res = await api.get(
        `/presentations/${presentation_id}/speeches/${speech_id}`
      );
      // console.log("speech response:", res);
      setRefSpeechId(res.data.refSpeechId); // 이전 스피치의 id 저장
      getResult(res.data.refSpeechId); // 분석 결과 가져오기
      getUserSymbols(res.data.refSpeechId); // 사용자 기호 가져오기
      getAudioSegments(res.data.audioSegments); // 오디오 세그먼트 가져오기
    } catch (err) {
      console.log("speech error:", err);
    }
  };

  // 사용자 기호 불러오기
  const getUserSymbols = async (prev_speech) => {
    try {
      const res = await api.get(
        `/presentations/${presentation_id}/speeches/${prev_speech}`
      );
      console.log("이전 speech의 사용자 기호 response:", res);
      initUserSymbols(res.data.userSymbol);
    } catch (err) {
      console.log("이전 speech의 사용자 기호 error:", err);
    }
  };
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

  // 분석 결과 presigned url 가져오기
  const getResult = async (prev_speech) => {
    try {
      const res = await api.get(
        `/presentations/${presentation_id}/speeches/${prev_speech}/analysis-records`
      );
      console.log("이전 스피치 분석 결과 response:", res);
      getSTT(res.data.STT);
      getCorrection(res.data.SPEECH_CORRECTION);
    } catch (err) {
      console.log("이전 스피치 분석 결과 error:", err);
    }
  };
  // 이전 스피치의 스크립트 가져오기
  const getSTT = async (url) => {
    try {
      const res = await axios.get(url);
      console.log("stt response:", res);
      const stt = JSON.parse(res.data);
      initSTT(stt);
    } catch (err) {
      console.log("stt error:", err);
    }
  };
  // 이전 스피치의 교정 부호 가져오기
  const [correction, setCorrection] = useState({
    PAUSE_TOO_LONG: new Set(),
    PAUSE_TOO_SHORT: new Set(),
    TOO_FAST: new Set(),
    startFast: new Set(),
    TOO_SLOW: new Set(),
    startSlow: new Set(),
  });
  const getCorrection = async (url) => {
    try {
      const res = await axios.get(url);
      // console.log("correction response:", res);
      const correctionList = JSON.parse(res.data);
      const correction = {
        PAUSE_TOO_LONG: new Set(correctionList.PAUSE_TOO_LONG),
        PAUSE_TOO_SHORT: new Set(correctionList.PAUSE_TOO_SHORT),
        TOO_FAST: new Set(
          correctionList.TOO_FAST.map((seg) => {
            let fastSeg = [];
            for (let i = seg[0]; i <= seg[1]; i++) {
              fastSeg.push(i);
            }
            return fastSeg;
          }).flat()
        ),
        startFast: new Set(correctionList.TOO_FAST.map((seg) => seg[0])),
        TOO_SLOW: new Set(
          correctionList.TOO_SLOW.map((seg) => {
            let slowSeg = [];
            for (let i = seg[0]; i <= seg[1]; i++) {
              slowSeg.push(i);
            }
            return slowSeg;
          }).flat()
        ),
        startSlow: new Set(correctionList.TOO_SLOW.map((seg) => seg[0])),
      };
      // console.log("correction:", correction);
      setCorrection(correction);
    } catch (err) {
      console.log("correction error:", err);
    }
  };

  const [text, setText] = useState([]);
  const initSTT = (stt) => {
    setText(stt.segments.flatMap((seg) => seg.words.map((w) => w[2])));
  };

  const symbols = [
    { name: "강조", src: "/img/script/toolbar/color/pencil1.svg" },
    { name: "빠르게", src: "/img/script/toolbar/color/pencil2.svg" },
    { name: "느리게", src: "/img/script/toolbar/color/pencil3.svg" },
    { name: "수정", src: "/img/script/toolbar/pencil.svg" },
    { name: "엔터", src: "/img/script/toolbar/down-left.svg" },
    { name: "쉬기", src: "/img/script/toolbar/pause.svg" },
    { name: "클릭", src: "/img/script/toolbar/mouse.svg" },
    { name: "끊어읽기", src: "/img/script/toolbar/slash.svg" },
    { name: "지우개", src: "/img/script/toolbar/eraser.svg" },
  ];

  // 실시간 파형
  const waveformRef = useRef(null);
  const [waveSurferInstance, setWaveSurferInstance] = useState(null);
  const [micReady, setMicReady] = useState(false);

  // 파형 초기화  및 마이크 준비
  useEffect(() => {
    let wavesurfer = null;
    const initWaveSurfer = () => {
      wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#ff7134",
        hideScrollbar: true,
        // progressColor: "red",
        barWidth: 3,
        barHeight: 5,
        interact: false,
        cursorWidth: 0,
        height: 64,
        plugins: [MicrophonePlugin.create()],
      });
      setWaveSurferInstance(wavesurfer);
      if (wavesurfer) {
        wavesurfer.microphone.start();
        setMicReady(true);
      }
    };

    // 사용자 입력으로 파형 생성
    const handleUserGesture = () => {
      if (!wavesurfer) {
        initWaveSurfer();
        wavesurfer.microphone.pause();
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

  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const mediaRecorderRef = useRef(null);
  const segmentRef = useRef([]); // 모든 blob 저장
  let wavList = []; // 단위 시간당 생성된 wav 파일

  const startRecording = async () => {
    // 녹음
    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
        mimeType: "audio/webm",
      }); // 마이크 권한 획득
      console.log("마이크 권한 획득 성공:", stream);
    } catch (err) {
      console.log("마이크 권한 획득 실패:", err);
    }

    setRecording(true);
    // 미디어 레코더 생성
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    // 음성이 잘라질 때마다
    // presigned url 받아오기: getPresignedUrl()
    // 현재 blob을 webm 파일로 변환: convertWav()
    // presigned url 업로드
    // presigned url 업로드 완료 통지
    mediaRecorder.ondataavailable = async (e) => {
      // 현재 blob을 전체 blob 리스트에 저장
      segmentRef.current.push(e.data);

      // presigned url 받아오기
      const presignedUrl = await getPresignedUrl();

      // 현재 blob을 webm 파일로 변환
      const data = await convertWav(e.data);

      // presigned url 업로드
      try {
        console.log("전송 중인 presigned url: ", presignedUrl);
        const res = await axios.put(presignedUrl, data, {
          withCredentials: true,
          headers: { "Content-Type": "audio/webm" },
        });
        console.log("S3 응답:", res);
        console.log("전송 data: ", data);
      } catch (err) {
        console.log("S3 에러: ", err);
        console.log("전송 data: ", data);
      }

      // presigned url 업로드 완료 통지
      try {
        const res = await api.post(
          `/presentations/${presentation_id}/speeches/${speech_id}/audio-segment/upload-url/done`,
          {
            params: {
              "presentation-id": presentation_id,
              "speech-id": speech_id,
            },
            url: presignedUrl,
          }
        );
        console.log("업로드 완료 통지 응답: ", res);
      } catch (err) {
        console.log("업로드 완료 통지 에러: ", err);
        // console.log(presentation_id, speech_id);
      }
    };

    // 3초마다 자르도록
    mediaRecorder.start(3000);

    // STT 시작
    SpeechRecognition.startListening({
      continuous: true,
      language: "ko",
    });

    // 파형 시작
    waveSurferInstance.microphone.play();
    setRecording(true);
    // });
  };

  const stopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;
    mediaRecorder.onstop = () => {
      console.log("segments: ", segmentRef.current);
    };
    if (recording) {
      setRecording(false);
      mediaRecorder.stop();
    }
    // combineToAudio(); // 지금까지의 세그먼트들을 하나로 합쳐서 재생 가능하게 만들기

    // STT 중단
    SpeechRecognition.stopListening();

    // 파형 일시정지
    waveSurferInstance.microphone.pause();
  };

  // presigned url 받아오기
  const getPresignedUrl = async () => {
    try {
      const res = await api.post(
        `/presentations/${presentation_id}/speeches/${speech_id}/audio-segments/upload-url`,
        {
          params: {
            "presentation-id": presentation_id,
            "speech-id": speech_id,
          },
          extension: "webm",
        }
      );
      console.log("presigned url 응답: ", res.data.url);
      return res.data.url;
    } catch (err) {
      console.log("presigned url 응답 에러: ", err);
    }
  };
  // 전달된 blob을 webm 파일로 변환
  const convertWav = async (segments) => {
    const combinedBlob = new Blob([segments], { type: "audio/webm" });
    wavList.push(combinedBlob);
    return combinedBlob;
  };

  // 전체 녹음 파일 재생 가능하도록 합치고 재생
  const play = () => {
    const segments = segmentRef.current;
    const audioElement = document.querySelector("#audio");
    // console.log("segments: ", segments);
    const combinedBlob = new Blob(segments, { type: "audio/webm" }); // 지금까지의 음성 데이터
    let audioUrl = URL.createObjectURL(combinedBlob);
    audioElement.src = audioUrl;
    if (audioUrl) {
      setPlaying(true);
      audioElement.play();
    }
    audioElement.onended = (event) => {
      setPlaying(false);
    };
  };

  const pausePlaying = () => {
    const audioElement = document.querySelector("#audio");
    audioElement.pause();
    setPlaying(false);
  };

  // STT
  const {
    transcript,
    // listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <span>
        사용 중인 브라우저가 음성 인식을 지원하지 않습니다. 서버의 음성 인식 및
        분석은 정상적으로 동작합니다.
      </span>
    );
  } else {
    // console.log("Browser supports speech recognition.");
  }

  // 녹음 완료 요청 후 분석 페이지로 이동
  const finishRecording = async () => {
    try {
      const res = await api.post(
        `/presentations/${presentation_id}/speeches/${speech_id}/record-done`,
        {
          params: {
            "presentation-id": presentation_id,
            "speech-id": speech_id,
          },
        }
      );
      console.log("record done response: ", res);
      navigate(
        `/presentation/speech?presentation_id=${presentation_id}&speech_id=${speech_id}`
      );
    } catch (err) {
      console.log("record done error: ", err);
    }
  };

  // 녹음 취소 (만들어진 스피치 삭제)
  const cancelRecording = async () => {
    // 녹음 취소 확인
    if (!window.confirm("녹음을 취소하시겠습니까?")) return;
    try {
      const res = await api.delete(
        `/presentations/${presentation_id}/speeches/${speech_id}`,
        {
          params: {
            "presentation-id": presentation_id,
            "speech-id": speech_id,
          },
        }
      );
      // console.log("cancel recording response: ", res);
      navigate(
        `/presentation/speech?presentation_id=${presentation_id}&&speech_id=${refSpeechId}`
      );
    } catch (err) {
      console.log("🩸cancel recording error: ", err);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Nav />
        <Container>
          <Script>
            <Screen>
              {isNew ? (
                <TextArea>
                  <div className="text-wrap">
                    <p>준비된 스크립트가 없습니다.</p>
                    <STTField>{transcript}</STTField>
                    <span className="stt-text">
                      * 이 텍스트 인식 결과는 스피치 진행 정도를 체크하기 위한
                      것으로, 실제 분석은 더 정확한 데이터로 이루어 질
                      예정입니다.
                    </span>
                  </div>
                </TextArea>
              ) : (
                // <s.ScriptContainer>
                <TextArea>
                  <div className="text-wrap">
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
                                <Correction> 🔸🔸 </Correction>
                              )}
                            {correction.PAUSE_TOO_SHORT &&
                              correction.PAUSE_TOO_SHORT.has(i - 1) && (
                                <Correction> 🔹🔹 </Correction>
                              )}
                          </Symbol>
                          <span
                            style={{
                              display: "inline-flex",
                              flexDirection: "column",
                            }}
                          >
                            <CorrectionLine
                              $status={
                                correction.TOO_FAST.has(i)
                                  ? "fast"
                                  : correction.TOO_SLOW.has(i)
                                  ? "slow"
                                  : null
                              }
                            >
                              {/* {correction.TOO_FAST.has(i)
                              ? "빨라요"
                              : correction.TOO_SLOW.has(i)
                              ? "느려요"
                              : null} */}
                              {correction.startFast.has(i)
                                ? "너무 빨라요"
                                : correction.startSlow.has(i)
                                ? "너무 느려요"
                                : "\u00A0"}
                            </CorrectionLine>
                            <s.Text
                              color={highlighted[i]}
                              $continued={
                                highlighted[i] === highlighted[i + 1] ? 1 : 0
                              }
                              key={i}
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
                              {word}
                            </s.Text>
                          </span>
                        </span>
                      ))}
                    </p>
                    {/* <StyledTextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    fullWidth
                    defaultValue=""
                    >
                      {transcript}
                    </StyledTextField> */}
                    <STTField>{transcript}</STTField>
                    <span className="stt-text">
                      * 이 텍스트 인식 결과는 스피치 진행 정도를 체크하기 위한
                      것으로, 실제 분석은 더 정확한 데이터로 이루어 질
                      예정입니다.
                    </span>
                  </div>
                </TextArea>
                // </s.ScriptContainer>
              )}

              <div className="sound-wave">
                {recording ? null : (
                  <s.WaveCover>녹음을 시작해 보세요</s.WaveCover>
                )}
                <s.WaveContainer ref={waveformRef} />
              </div>

              {/* <s.Controls>
                {recording ? (
                  <s.Button onClick={stopRecording}>일시정지</s.Button>
                ) : (
                  <s.Button onClick={startRecording} disabled={!micReady}>
                    녹음시작
                  </s.Button>
                )}
                <s.Button onClick={resetTranscript}>Reset</s.Button>
                <audio id="audio" controls />
              </s.Controls> */}
            </Screen>
            {/* 재생 바 */}
            <PC>
              <ScriptBarWrap>
                <ul className="btn-wrap">
                  <li>
                    <SolideBtn
                      text={"취소하기"}
                      color={"white"}
                      onClick={cancelRecording}
                    />
                  </li>
                  <li>
                    {/* <span onClick={play}>
                      <SolideBtn
                        text={"녹음본 들어보기"}
                        color={"white"}
                        // onClick={play}
                      />
                    </span> */}
                    {playing ? (
                      <PlayBtn variant="contained" onClick={pausePlaying}>
                        <StopIcon />
                      </PlayBtn>
                    ) : (
                      <PlayBtn
                        variant="contained"
                        onClick={play}
                        disabled={recording || segmentRef.current.length === 0}
                      >
                        <PlayArrowIcon />
                      </PlayBtn>
                    )}

                    {recording ? (
                      <PlayBtn variant="contained" onClick={stopRecording}>
                        <PauseIcon />
                      </PlayBtn>
                    ) : (
                      <PlayBtn
                        variant="contained"
                        onClick={startRecording}
                        disabled={!micReady}
                      >
                        <KeyboardVoiceIcon />
                      </PlayBtn>
                    )}
                    {/* <PlayBtn variant="contained" onClick={resetTranscript}>
                      R
                    </PlayBtn> */}
                  </li>
                  <li>
                    <FilledBtn text={"완료하기"} onClick={finishRecording} />
                  </li>
                </ul>
                <audio id="audio" />
              </ScriptBarWrap>
            </PC>
            <Mobile>
              <ScriptBarWrap>
                <ul className="btn-wrap">
                  <li>
                    {playing ? (
                      <PlayBtn variant="contained" onClick={pausePlaying}>
                        <StopIcon />
                      </PlayBtn>
                    ) : (
                      <PlayBtn
                        variant="contained"
                        onClick={play}
                        disabled={recording || segmentRef.current.length === 0}
                      >
                        <PlayArrowIcon />
                      </PlayBtn>
                    )}
                    {recording ? (
                      <PlayBtn variant="contained" onClick={stopRecording}>
                        <PauseIcon />
                      </PlayBtn>
                    ) : (
                      <PlayBtn
                        variant="contained"
                        onClick={startRecording}
                        disabled={!micReady}
                      >
                        <KeyboardVoiceIcon />
                      </PlayBtn>
                    )}
                  </li>
                  <li>
                    <SolideBtn text={"취소하기"} color={"white"} />
                    <FilledBtn text={"완료하기"} />
                  </li>
                </ul>
              </ScriptBarWrap>
            </Mobile>
          </Script>
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
  width: 90%;
  height: 80vh;

  margin: 13rem auto 0 auto;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media ${() => theme.device.desktop} {
  }
  @media ${() => theme.device.mobile} {
    width: 100%;
    margin-top: 10rem;
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
    /* width: 300px; */
    display: flex;
    align-items: center;
    justify-content: center;
    /* height: 64px; */
    /* img {
      width: 40%;
    } */
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
  width: 100%;
  .text-wrap {
    padding: 3rem;
  }
  p {
    height: fit-content;
    height: 250px;
    max-height: 250px;
    overflow-y: scroll;
    padding: 3rem;
    background-color: #f5f5f5;
    font-size: 2rem;
    line-height: 200%;
    color: #3b3b3b;
    margin-bottom: 2rem;
    img {
      width: 1.5rem;
      height: 1.5rem;
      margin: 0 0.5rem 0 0.5rem;
      filter: invert(43%) sepia(98%) saturate(401%) hue-rotate(346deg)
        brightness(101%) contrast(88%);
    }
  }

  .stt-text {
    font-size: 1.4rem;
    color: #f38025;
    font-weight: 400;
    line-height: 150%;
    margin-top: 1rem;
    display: inline-block;
  }

  @media ${() => theme.device.mobile} {
    p {
      height: auto;
      font-size: 1.8rem;
    }
  }
`;

const STTField = styled.div`
  padding: 3rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  font-size: 1.6rem;
  color: #3b3b3b;
  line-height: 150%;
  /* width: 100%; */
  height: 6rem;
`;

// const StyledTextField = styled(TextField)`
//   textarea {
//     font-size: 1.6rem;
//     color: #3b3b3b;
//     line-height: 150%;
//   }
// `;

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
  .btn-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 3rem;
    button {
      font-size: 1.6rem;
      padding: 1rem 3rem;
      margin-right: 2rem;
      svg {
        color: #ff7134 !important;
      }
    }
    button:last-of-type {
      margin: 0;
    }
    .Mui-disabled {
      background-color: #e0e0e0;
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
    .btn-wrap {
      justify-content: center;
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
    svg {
      width: 3rem;
      height: 3rem;
    }
  }
`;

const Correction = styled.span`
  color: #ff7134;
`;

const Symbol = styled.span`
  /* margin: auto; */
  height: 3rem;
  vertical-align: bottom;
  padding-bottom: 1rem;
  /* img {
    margin-top: 2rem;
  } */
`;
const CorrectionLine = styled.span`
  line-height: 100%;
  background-color: ${(props) =>
    props.$status === "fast"
      ? "red"
      : props.$status === "slow"
      ? "green"
      : "transparent"};
  opacity: 0.7;
  font-size: 1rem;
  font-weight: bold;
  color: white;
`;
export default Practice;
