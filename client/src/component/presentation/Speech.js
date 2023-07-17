import React, { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import WaveSurfer from "wavesurfer.js";
// import mp3 from "../../sound/mp3ex.mp3";
import mp3 from "./mp3.mp3";
import stt from "./stt.json";

import highlight from "../../image/icons/highlight.png";
import faster from "../../image/icons/faster.png";
import slower from "../../image/icons/slower.png";
import edit from "../../image/icons/edit.png";
import enter from "../../image/icons/enter.png";
import pause from "../../image/icons/pause.png";
import mouse from "../../image/icons/mouse.png";
import slash from "../../image/icons/slash.png";
import erase from "../../image/icons/erase.png";

const Container = styled.div`
  cursor: url(${(props) => props.cursor}) 50 50, auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  height: 90vh;
`;

// 툴바
const Tools = styled.div`
  width: 100px;
  height: 550px;
  border: 1px solid grey;
  border-radius: 5px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: 2px 3px 5px 0px grey;
`;

// 툴바의 기호(hover effect)
const ToolKit = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  cursor: url(${(props) => props.cursor}) 50 50, auto;

  &:hover {
    width: 65px;
    height: 65px;
  }
`;

// 스크립트의 기호
const Tool = styled.span`
  display: inline-block;
  width: 25px;
  height: 25px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  cursor: url(${(props) => props.cursor}) 50 50, auto;
`;

// 스크립트
const Text = styled.span`
  position: relative;
  color: ${(props) => (props.played ? "orange" : "black")};
  background-color: ${(props) => props.color};
  margin-right: ${(props) => (props.continued ? "none" : "5px")};
  padding-right: ${(props) => (props.continued ? "5px" : "none")};
  text-decoration: ${(props) => (props.edited ? "underline" : "none")};

  &:hover {
    text-decoration: orange dashed underline;
  }
`;

// 수정 전 단어 (툴팁)
const OriginalText = styled.span`
  visibility: hidden;
  width: 120px;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
  font-size: 14px;
  background-color: grey;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 5px;
  position: absolute;
  z-index: 1;

  ${Text}:hover & {
    visibility: visible;
  }

  // 아래 화살표
  &::after {
    content: " ";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: grey transparent transparent transparent;
  }
`;

const ScriptContainer = styled.div`
  width: 700px;
  height: 50vh;
  overflow-y: scroll;
  font-size: 24px;
  padding: 24px;
  border: 1px solid grey;
  border-radius: 10px;
`;

const WaveContainer = styled.div`
  width: 748px;
  height: 64px;
  border: 1px solid grey;
  // border-radius: 10px;
`;

// 페이지네이션
const Pagination = styled.div`
  width: 100px;
  height: 550px;
  border: 1px solid grey;
  border-radius: 5px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: 2px 3px 5px 0px grey;
`;

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

  // script
  // const text =
  //   "저희는 음성 데이터 분석을 통해 스피치에 있어 중요한 요소들을 평가하고, 연습에 유용한 도구를 제공하여 반복을 통한 스피치 실력 향상을 도우며, 스피치 전문가와의 부담 없는 코칭 환경을 제공하는 솔루션인 톡피넛을 개발하려고 합니다. 기존에도 발표 연습 도우미와 같은 서비스들은 존재합니다. 그러나 이런 서비스들은 스피치 교정이라기 보다는 연습 보조에 치우쳐 있습니다. 스피치 학원같이 전문가의 코칭을 받는 방법도 있지만 설문조사 결과 사용자들은 이런 코칭에 부담감을 느끼는 것으로 나타났습니다. 또한 많은 사용자들이 스피치를 혼자 녹음한 후 다시 들어보며 연습한다고 응답했기 때문에, 저희는 그 과정에 필요한 도구를 제공하고 보완점을 교정해주며, 나아가 전문가의 도움을 부담 없이 받도록 해주는 솔루션을 제공하고자 합니다. 저희가 생각한 기능은 크게 스피치 녹음 및 피드백, 교정 표시와 사용자 기호, 스피치 전문가 매칭으로 나뉩니다. 이에 대해서는 뒤에서 자세히 설명드리겠습니다. 프로젝트 중에는 최대한 사용자들의 의견을 많이 반영하려고 합니다. 다양한 스피치 분야 중 특히 발표에 특화된 솔루션을 먼저 제작해 8월과 10월에 총 두 번 베타테스트를 진행할 예정입니다. 사용자의 피드백을 받아 기능을 개선한 후 다른 분야의 스피치도 지원하도록 수평적으로 확장할 계획입니다. 결과물은 웹 서비스와 하이브리드 앱으로 생각하고 있고, 솔루션에 대해 특허 출원을 할 것입니다. 저희 솔루션을 통해 스피치 교정에 대한 진입 장벽이 완화되어 잠재 고객이 스피치 교정 시장의 고객으로 전환될 수 있을 것입니다. 기획에 앞서 설문조사를 진행해 보았습니다. 총 91.2%의 사용자가 말하기 실력 향상을 위해 따로 시간을 들여 노력해 본 경험이 있다고 답했으며, 62.1%의 사용자가 전문가에게 스피치 코칭을 받아 볼 의향은 있으나 경험은 없다고 답했습니다. 스피치 코칭을 주저하는 이유로는 비용의 부담, 시공간적 제약, 심리적 부담감을 꼽았습니다. 가장 많은 응답을 받은 비용의 부담에 관해 조사해 보니 실제 스피치 학원의 수업료는 1회 20만원으로 금전적 부담이 컸습니다. 또한 대부분 대면 수업으로 진행되므로 시공간적 제약도 항상 존재했습니다. 스피치 학원 대신, 사용자들은 주로 혼자 발표 내용을 녹음해 들어보며 연습하는 것으로 나타났습니다. 그 과정에서 예상되는 어려움과 그를 해결하기 위한 기능에 대해 사용자가 얼마나 긍정적인 반응을 보일 지 조사해 보았습니다. 보다시피 대부분의 사용자가 저희가 제공하고자 하는 기능에 긍정적인 반응을 보였습니다. 지금까지 설명드린 설문조사 결과에서, 저희는 효과적이고 효율적인 스피치 연습을 가능하게 하고, 스피치 교정에 대한 사용자의 부담을 덜 수 있는 솔루션의 필요성을 확인했습니다.".split(
  //     " "
  //   );

  // stt 결과 형식에 맞게 데이터 파싱
  const text = stt.segments.flatMap((seg) => seg.words.map((w) => w[2]));
  const started = stt.segments.flatMap((seg) =>
    seg.words.map((w) => w[0] * 0.01)
  );
  // console.log(text, started);

  // started.unshift(0);

  // 임시로 단어별 시작 시간 서정
  // 각 단어의 소요 시간은 단어 길이와 같다고 가정
  // let z = 0;
  // const started = text.map((word) => {
  //   z += word.length;
  //   return z;
  // });
  // console.log(started);

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

  const HandleEdit = (e) => {
    console.log(e);
    if (e.key === "Enter") {
      e.preventDefault(); // 줄바꿈 방지
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
      <Container cursor={cursor}>
        <Tools>
          {symbols.map((c, i) => (
            <ToolKit
              key={i}
              id={i}
              src={c}
              cursor={cursor}
              onClick={clickTool}
            />
          ))}
        </Tools>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            height: "85vh",
          }}
        >
          <div>
            {waveFormLoaded ? null : (
              <div style={{ position: "absolute" }}>loading...</div>
            )}
            <WaveContainer ref={wavesurferRef} />
          </div>

          <ScriptContainer>
            {text.map((word, i) => (
              <Text
                played={started[i] < count}
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
                    <Tool src={enter} />
                    <br />
                  </>
                ) : null}
                {pauseSymbol[i] ? <Tool src={pause} /> : null}
                {mouseSymbol[i] ? <Tool src={mouse} /> : null}
                {slashSymbol[i] ? <Tool src={slash} /> : null}
                {edited[i] ? (
                  <>
                    {edited[i]}
                    <OriginalText>수정 전: {word}</OriginalText>
                  </>
                ) : (
                  <>{word}</>
                )}
              </Text>
            ))}
          </ScriptContainer>
          <div>
            <button ref={playButton}>play</button>
            <button onClick={onReset}>reset</button>
          </div>
          <Link to="/presentation/practice">연습 시작</Link>
          <div>count: {count}</div>
        </div>
        <Pagination>pagination</Pagination>
      </Container>
    </>
  );
};

export default Speech;
