import styled, { keyframes } from "styled-components";

// 전체 페이지
export const Container = styled.div`
  cursor: url(${(props) => props.cursor}) 50 50, auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  height: 90vh;
`;

// 툴바
export const Tools = styled.div`
  position: relative;
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
export const ToolKit = styled.div`
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

// 스크립트 영역 전체
export const Script = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 85vh;
`;
// 파형 ref
export const WaveWrapper = styled.div`
  display: ${(props) => (props.$ready ? "block" : "none")};
  /* width: 748px; */
  width: 90%;
  /* height: 64px; */
  height: 100%;
  /* width: 100%;
  height: 100%; */
  margin-bottom: 3rem;
  /* border: 1px solid grey; */
`;
// 파형 로딩 박스
export const LoadingBox = styled.div`
  position: absolute;
  font-size: large;
  background-color: antiquewhite;
  z-index: 100;
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;
// 스크립트
export const ScriptContainer = styled.div`
  width: 700px;
  height: 50vh;
  overflow-y: scroll;
  font-size: 24px;
  padding: 24px;
  border: 1px solid grey;
  border-radius: 10px;
`;
// 스크립트 재생 애니메이션
export const PlayingText = keyframes`
from {
  background-position-x: 0%;
}
to {
  background-position-x: 100%;
}
`;
// 스크립트의 단어
export const Text = styled.span`
  /* display: inline-flex;
  width: fit-content; */
  flex-direction: column;
  /* min-width: 50px; */
  position: relative;
  background-clip: ${(props) => (props.$played === "playing" ? "text" : "")};
  -webkit-background-clip: ${(props) =>
    props.$played === "playing" ? "text" : ""};
  color: ${(props) =>
    props.$played === "playing"
      ? "transparent"
      : props.$played === "played"
      ? "orange"
      : "black"};
  background-image: ${(props) =>
    props.$played === "playing"
      ? "linear-gradient(to right, orange 50%, black 50% 100%)"
      : ""};

  background-size: 200% 100%;
  background-position-x: 0%;
  animation-name: ${(props) =>
    props.$played === "playing" ? PlayingText : ""};
  animation-duration: ${(props) => props.$duration}s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-direction: reverse;
  animation-fill-mode: forwards;

  background-color: ${(props) => props.color};
  margin-right: ${(props) => (props.$continued ? "none" : "5px")};
  padding-right: ${(props) => (props.$continued ? "5px" : "none")};
  text-decoration: ${(props) => (props.$edited ? "underline" : "none")};
  /* text-decoration: ${(props) =>
    props.$correction === "fast"
      ? "red dotted overline "
      : props.$correction === "slow"
      ? "green dotted overline "
      : "none"}; */

  &:hover {
    /* text-decoration: orange dashed underline; */
    font-weight: bold;
  }
`;
export const EditedText = styled.span`
  // text-decoration: underline;
`;
// 스크립트의 기호
export const Tool = styled.span`
  display: inline-block;
  width: 25px;
  height: 25px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  cursor: url(${(props) => props.cursor}) 50 50, auto;
`;
// 수정 전 단어 + 툴팁
export const OriginalText = styled.span`
  visibility: hidden;
  width: 120%;
  bottom: 100%;
  left: 50%;
  margin-left: calc(-60% - 0.5rem);
  font-size: 1.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  text-align: center;
  padding: 0.5rem 0.2rem;
  border-radius: 5px;
  position: absolute;
  z-index: 1;
  transition: all 0.1s ease-in-out;

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
    border-color: rgba(0, 0, 0, 0.3) transparent transparent transparent;
  }
`;

// 비활성화 박스 (툴바, 페이지네이션에 적용)
export const DisableBox = styled.div`
  position: absolute;
  width: 100px;
  height: 550px;
  background-color: grey;
  opacity: 0.5;
  z-index: 100;
`;
