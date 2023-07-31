import React, { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import MicrophonePlugin from "wavesurfer.js/dist/plugin/wavesurfer.microphone.min.js";
import * as s from "./PracticeStyle";
import axios from "axios";

import enter from "../../../image/icons/enter.png";
import pause from "../../../image/icons/pause.png";
import mouse from "../../../image/icons/mouse.png";
import slash from "../../../image/icons/slash.png";

import styled from "@emotion/styled";
import { createGlobalStyle } from "styled-components";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import { Box, IconButton, Button } from "@mui/material";
import Nav from "../../layout/Nav";
import theme from "../../../style/theme";
// import ScriptBar2 from "../../component/script/ScriptBar2";
import TextField from "@mui/material/TextField";

import FilledBtn from "../../button/FilledBtn";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SolideBtn from "../../button/SolidBtn";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import PauseIcon from "@mui/icons-material/Pause";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

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
  // const [presignedUrl, setPresignedUrl] = useState(null);
  // presigned url 받아오기
  // mock data
  const presentation_id = 2;
  const speech_id = 3;

  // 스크립트
  const text =
    "저희는 음성 데이터 분석을 통해 스피치에 있어 중요한 요소들을 평가하고, 연습에 유용한 도구를 제공하여 반복을 통한 스피치 실력 향상을 도우며, 스피치 전문가와의 부담 없는 코칭 환경을 제공하는 솔루션인 톡피넛을 개발하려고 합니다. 기존에도 발표 연습 도우미와 같은 서비스들은 존재합니다. 그러나 이런 서비스들은 스피치 교정이라기 보다는 연습 보조에 치우쳐 있습니다. 스피치 학원같이 전문가의 코칭을 받는 방법도 있지만 설문조사 결과 사용자들은 이런 코칭에 부담감을 느끼는 것으로 나타났습니다. 또한 많은 사용자들이 스피치를 혼자 녹음한 후 다시 들어보며 연습한다고 응답했기 때문에, 저희는 그 과정에 필요한 도구를 제공하고 보완점을 교정해주며, 나아가 전문가의 도움을 부담 없이 받도록 해주는 솔루션을 제공하고자 합니다. 저희가 생각한 기능은 크게 스피치 녹음 및 피드백, 교정 표시와 사용자 기호, 스피치 전문가 매칭으로 나뉩니다. 이에 대해서는 뒤에서 자세히 설명드리겠습니다. 프로젝트 중에는 최대한 사용자들의 의견을 많이 반영하려고 합니다. 다양한 스피치 분야 중 특히 발표에 특화된 솔루션을 먼저 제작해 8월과 10월에 총 두 번 베타테스트를 진행할 예정입니다. 사용자의 피드백을 받아 기능을 개선한 후 다른 분야의 스피치도 지원하도록 수평적으로 확장할 계획입니다. 결과물은 웹 서비스와 하이브리드 앱으로 생각하고 있고, 솔루션에 대해 특허 출원을 할 것입니다. 저희 솔루션을 통해 스피치 교정에 대한 진입 장벽이 완화되어 잠재 고객이 스피치 교정 시장의 고객으로 전환될 수 있을 것입니다. 기획에 앞서 설문조사를 진행해 보았습니다. 총 91.2%의 사용자가 말하기 실력 향상을 위해 따로 시간을 들여 노력해 본 경험이 있다고 답했으며, 62.1%의 사용자가 전문가에게 스피치 코칭을 받아 볼 의향은 있으나 경험은 없다고 답했습니다. 스피치 코칭을 주저하는 이유로는 비용의 부담, 시공간적 제약, 심리적 부담감을 꼽았습니다. 가장 많은 응답을 받은 비용의 부담에 관해 조사해 보니 실제 스피치 학원의 수업료는 1회 20만원으로 금전적 부담이 컸습니다. 또한 대부분 대면 수업으로 진행되므로 시공간적 제약도 항상 존재했습니다. 스피치 학원 대신, 사용자들은 주로 혼자 발표 내용을 녹음해 들어보며 연습하는 것으로 나타났습니다. 그 과정에서 예상되는 어려움과 그를 해결하기 위한 기능에 대해 사용자가 얼마나 긍정적인 반응을 보일 지 조사해 보았습니다. 보다시피 대부분의 사용자가 저희가 제공하고자 하는 기능에 긍정적인 반응을 보였습니다. 지금까지 설명드린 설문조사 결과에서, 저희는 효과적이고 효율적인 스피치 연습을 가능하게 하고, 스피치 교정에 대한 사용자의 부담을 덜 수 있는 솔루션의 필요성을 확인했습니다.".split(
      " "
    );
  // 각 기호의 렌더링 여부
  // Practice 컴포넌트에서는 사용자 기호를 수정할 일이 없으므로 상수로 선언
  const enterSymbol = text.map((s, i) => (i === 38 ? true : false));
  const pauseSymbol = text.map((s, i) => (i === 100 ? true : false));
  const mouseSymbol = text.map((s, i) => (i === 40 ? true : false));
  const slashSymbol = text.map((s, i) => (i % 7 === 2 ? true : false));
  const highlighted = text.map((s, i) =>
    i === 10 ? "pink" : i === 35 ? "yellow" : ""
  );

  // 실시간 파형
  const waveformRef = useRef(null);
  const [waveSurferInstance, setWaveSurferInstance] = useState(null);
  const [micReady, setMicReady] = useState(false);

  useEffect(() => {
    // 파형 초기화
    let wavesurfer = null;
    const initWaveSurfer = () => {
      wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "black",
        hideScrollbar: true,
        // progressColor: "red",
        // barWidth: 3,
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

        console.log("pause");
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
  const mediaRecorderRef = useRef(null);
  const segmentRef = useRef([]); // 모든 blob 저장
  let wavList = []; // 단위 시간당 생성된 wav 파일

  const startRecording = async () => {
    // if (!presignedUrl) {
    //   console.log("presigned url이 없습니다.");
    //   return;
    // }
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

    // .then((stream) => {
    setRecording(true);
    // 미디어 레코더 생성
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    // 음성이 잘라질 때마다
    mediaRecorder.ondataavailable = async (e) => {
      // 현재 blob을 전체 blob 리스트에 저장
      segmentRef.current.push(e.data);

      // presigned url 받아오기
      const presignedUrl = await getPresignedUrl();
      // setPresignedUrl(presignedUrl);

      // 현재 blob을 webm 파일로 변환
      const data = await convertWav(e.data);
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
    };

    // 3초마다 자르도록
    mediaRecorder.start(10000);

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
    play(); // 지금까지의 세그먼트들을 하나로 합쳐서 재생 가능하게 만들기

    // STT 중단
    SpeechRecognition.stopListening();

    // 파형 일시정지
    waveSurferInstance.microphone.pause();
  };

  // presigned url 받아오기
  const getPresignedUrl = async () => {
    try {
      const res = await axios.post(
        `/presentations/${presentation_id}/speeches/${speech_id}/audio-segments/upload-url`,
        {
          params: {
            presentation_id: presentation_id,
            speech_id: speech_id,
          },
          extension: "webm",
        }
      );
      console.log("presigned url 응답: ", res.data.url);
      // setPresignedUrl(res.data.url);
      return res.data.url;
      // console.log("presigned url: ", presignedUrl);
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

  // 전체 녹음 파일 재생 (재생 가능하도록 합치기)
  const play = () => {
    const segments = segmentRef.current;
    const audioElement = document.querySelector("#audio");

    const combinedBlob = new Blob(segments, { type: "audio/webm" }); // 지금까지의 음성 데이터
    let audioUrl = URL.createObjectURL(combinedBlob);
    audioElement.src = audioUrl;
  };

  // STT
  const {
    transcript,
    // listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  } else {
    // console.log("Browser supports speech recognition.");
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Nav />
        <Container>
          <Script>
            <Screen>
              {isNew ? (
                <s.NoScript>준비된 스크립트가 없습니다.</s.NoScript>
              ) : (
                // <s.ScriptContainer>
                <TextArea>
                  <div className="text-wrap">
                    <p>
                      {text.map((word, i) => (
                        <s.Text
                          color={highlighted[i]}
                          continued={highlighted[i] === highlighted[i + 1]}
                          key={i}
                          id={i}
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
                          {word}
                        </s.Text>
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

              {/* <s.STTContainer>{transcript}</s.STTContainer> */}

              {/* <div className="sound-wave">
                {recording ? null : (
                  <s.WaveCover>녹음을 시작해 보세요</s.WaveCover>
                )}
                <s.WaveContainer ref={waveformRef} />
              </div> */}

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
                    <FilledBtn text={"취소하기"} />
                  </li>
                  <li>
                    <PlayBtn variant="contained">
                      <PlayArrowIcon />
                    </PlayBtn>
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
                    <PlayBtn variant="contained" onClick={resetTranscript}>
                      R
                    </PlayBtn>
                  </li>
                  <li>
                    <SolideBtn text={"완료하기"} color={"white"} />
                  </li>
                </ul>
                <audio id="audio" />
              </ScriptBarWrap>
            </PC>
            <Mobile>
              <ScriptBarWrap>
                <ul className="btn-wrap">
                  <li>
                    <PlayBtn variant="contained">
                      <PlayArrowIcon />
                    </PlayBtn>
                    <PlayBtn variant="contained">
                      <KeyboardVoiceIcon />
                    </PlayBtn>
                    <PlayBtn variant="contained">
                      <PauseIcon />
                    </PlayBtn>
                  </li>
                  <li>
                    <FilledBtn text={"취소하기"} />
                    <SolideBtn text={"완료하기"} color={"white"} />
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

export default Practice;
