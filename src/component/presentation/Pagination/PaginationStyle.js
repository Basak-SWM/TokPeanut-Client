import styled from "styled-components";

// 페이지네이션 컨테이너
export const Container = styled.div`
  width: 200px;
  /* height: 500px; */
  border: 1px solid grey;
  margin: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  /* box-shadow: 2px 3px 5px 0px grey; */
`;

// 스피치 카드
export const Speech = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 160px;
  height: 60px;
  border: 1px solid grey;
  padding: 20px;
`;
// 스피치 제목
export const SpeechTitle = styled.div`
  font-size: 24px;
  width: 160px;
  display: flex;
  justify-content: space-around;
  /* color: orange; */
`;
export const SpeechTitleStar = styled.div`
  color: orangered;
`;
export const SpeechDate = styled.div`
  color: grey;
  font-size: 10px;
`;
