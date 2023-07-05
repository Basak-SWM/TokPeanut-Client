import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

const PlayedText = styled.span`
  color: orange;
`;

const Text = styled.span`
  color: black;
`;

const Desc = styled.div`
  color: blue;
  font-weight: bold;
`;

const Container = styled.div`
  width: 100vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScriptContainer = styled.div`
  width: 50vw;
  overflow-y: scroll;
  font-size: 24px;
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

const Script = () => {
  const text = "저희는 음성 데이터 분석을 통해".split(" ");
  const started = [1, 5, 6, 7, 10]; // 단어별 시작 시간
  started.unshift(0);

  // const text =
  //   "저희는 음성 데이터 분석을 통해 스피치에 있어 중요한 요소들을 평가하고, 연습에 유용한 도구를 제공하여 반복을 통한 스피치 실력 향상을 도우며, 스피치 전문가와의 부담 없는 코칭 환경을 제공하는 솔루션인 톡피넛을 개발하려고 합니다. 기존에도 발표 연습 도우미와 같은 서비스들은 존재합니다. 그러나 이런 서비스들은 스피치 교정이라기 보다는 연습 보조에 치우쳐 있습니다. 스피치 학원같이 전문가의 코칭을 받는 방법도 있지만 설문조사 결과 사용자들은 이런 코칭에 부담감을 느끼는 것으로 나타났습니다. 또한 많은 사용자들이 스피치를 혼자 녹음한 후 다시 들어보며 연습한다고 응답했기 때문에, 저희는 그 과정에 필요한 도구를 제공하고 보완점을 교정해주며, 나아가 전문가의 도움을 부담 없이 받도록 해주는 솔루션을 제공하고자 합니다. 저희가 생각한 기능은 크게 스피치 녹음 및 피드백, 교정 표시와 사용자 기호, 스피치 전문가 매칭으로 나뉩니다. 이에 대해서는 뒤에서 자세히 설명드리겠습니다. 프로젝트 중에는 최대한 사용자들의 의견을 많이 반영하려고 합니다. 다양한 스피치 분야 중 특히 발표에 특화된 솔루션을 먼저 제작해 8월과 10월에 총 두 번 베타테스트를 진행할 예정입니다. 사용자의 피드백을 받아 기능을 개선한 후 다른 분야의 스피치도 지원하도록 수평적으로 확장할 계획입니다. 결과물은 웹 서비스와 하이브리드 앱으로 생각하고 있고, 솔루션에 대해 특허 출원을 할 것입니다. 저희 솔루션을 통해 스피치 교정에 대한 진입 장벽이 완화되어 잠재 고객이 스피치 교정 시장의 고객으로 전환될 수 있을 것입니다. 기획에 앞서 설문조사를 진행해 보았습니다. 총 91.2%의 사용자가 말하기 실력 향상을 위해 따로 시간을 들여 노력해 본 경험이 있다고 답했으며, 62.1%의 사용자가 전문가에게 스피치 코칭을 받아 볼 의향은 있으나 경험은 없다고 답했습니다. 스피치 코칭을 주저하는 이유로는 비용의 부담, 시공간적 제약, 심리적 부담감을 꼽았습니다. 가장 많은 응답을 받은 비용의 부담에 관해 조사해 보니 실제 스피치 학원의 수업료는 1회 20만원으로 금전적 부담이 컸습니다. 또한 대부분 대면 수업으로 진행되므로 시공간적 제약도 항상 존재했습니다. 스피치 학원 대신, 사용자들은 주로 혼자 발표 내용을 녹음해 들어보며 연습하는 것으로 나타났습니다. 그 과정에서 예상되는 어려움과 그를 해결하기 위한 기능에 대해 사용자가 얼마나 긍정적인 반응을 보일 지 조사해 보았습니다. 보다시피 대부분의 사용자가 저희가 제공하고자 하는 기능에 긍정적인 반응을 보였습니다. 지금까지 설명드린 설문조사 결과에서, 저희는 효과적이고 효율적인 스피치 연습을 가능하게 하고, 스피치 교정에 대한 사용자의 부담을 덜 수 있는 솔루션의 필요성을 확인했습니다.".split(
  //     " "
  //   );
  // let started = [];
  // useEffect(() => {
  //   let tem = 0;
  //   text.forEach((word) => {
  //     tem += word.length;
  //     started.push(tem);
  //   });
  //   console.log(started);
  // }, []);

  const { count, start, stop, reset } = useCounter(0, 1000); // 1초 단위 타이머

  return (
    <Container>
      <Desc>Script / 재생되는 스크립트 + 교정 표시 및 사용자 기호</Desc>
      <ScriptContainer>
        {text.map((word, i) =>
          started[i] < count ? (
            <PlayedText key={i}> {word + " "} </PlayedText>
          ) : (
            <Text key={i}>{word + " "}</Text>
          )
        )}
      </ScriptContainer>
      <div>
        <button onClick={start}>start</button>
        <button onClick={stop}>stop</button>
        <button onClick={reset}>reset</button>
      </div>
    </Container>
  );
};

export default Script;
