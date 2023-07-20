import styled from "styled-components";

// 전체 페이지
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  height: 90vh;
`;

// 페이지네이션
export const Pagination = styled.div`
  width: 200px;
  height: 500px;
  border: 1px solid grey;
  border-radius: 5px;
  margin: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: 2px 3px 5px 0px grey;
`;

// 모든 요약 정보들의 컨테이너
export const SummaryContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: space-around; */
  width: 1000px;
  max-height: 90vh;
  overflow: hidden scroll;
`;
// 각 요약 정보
export const SummaryWrapper = styled.div`
  width: 900px;
  height: 300px;
  margin: 25px 0 25px 0;
`;
// 각 요약 정보 제목
export const SummaryText = styled.div`
  border-bottom: 2px solid orange;
  height: 20px;
  padding: 15px 0 15px 0;
  font-size: 20px;
`;
// 요약 정보 그래프
export const Graph = styled.div`
  height: 250px;
  border: 1px solid grey;
  border-radius: 5px;
  margin-top: 10px;
`;
