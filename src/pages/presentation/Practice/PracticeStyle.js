import styled from "styled-components";

// 전체 페이지
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 90vh;
`;

// 준비된 스크립트가 없을 때 스크립트 영역
export const NoScript = styled.div`
  width: 80vw;
  height: 40vh;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: grey;
  font-size: 16px;
  border: 1px solid grey;
  border-radius: 10px;
`;
// 스크립트
export const ScriptContainer = styled.div`
  width: 80vw;
  height: 40vh;
  overflow-y: scroll;
  font-size: 24px;
  padding: 24px;
  border: 1px solid grey;
  border-radius: 10px;
`;
// 스트립트의 단어
export const Text = styled.span`
  /* color: black; */
  background-color: ${(props) => props.color};
  margin-right: ${(props) => (props.$continued ? "none" : "5px")};
  padding-right: ${(props) => (props.$continued ? "5px" : "none")};
  text-decoration: ${(props) => (props.$edited ? "underline" : "none")};
  &:hover {
    /* text-decoration: orange dashed underline; */
    font-weight: bold;
    cursor: pointer;
  }
`;
// 사용자 기호
export const Tool = styled.span`
  display: inline-block;
  width: 25px;
  height: 25px;
  background-image: url(${(props) => props.src});
  background-size: cover;
`;

// STT 영역
export const STTContainer = styled.div`
  width: 80vw;
  height: 10vh;
  border: 1px solid grey;
  padding: 24px;
  overflow-y: scroll;
`;

// 실시간 파형
export const WaveContainer = styled.div`
  /* width: 300px; */
  width: 50%;
  height: 5rem;
  border: 3px 0 0 0 solid grey;
  /* border-radius: 50px; */
  padding: 20px 10px 20px 10px;
`;
// 파형 덮개
export const WaveCover = styled.div`
  position: absolute;
  width: 50%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: #3b3b3b;
  font-size: 2rem;
  z-index: 100;
  padding: 20px 10px 20px 10px;
`;

// 제어 버튼들 영역
export const Controls = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 30vw;
`;
// 제어 버튼
export const Button = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background-color: orange;
  color: white;
  border: none;
`;
