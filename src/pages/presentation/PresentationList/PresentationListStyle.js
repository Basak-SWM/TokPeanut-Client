import styled from "styled-components";

// 전체 페이지
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 90vh;
  /* padding-top: 10vw; */
`;

// 페이지 제목
export const Title = styled.div`
  border-bottom: 2px solid orange;
  width: 1000px;
  height: 20px;
  padding: 15px 0 15px 0;
  font-size: 20px;
`;

// 프레젠테이션 카드
export const Presentation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 900px;
  height: 150px;
  border: 1px solid grey;
  padding: 0 50px 0 50px;
  margin: 20px;
  border-radius: 5px;
`;
// 프레젠테이션 제목
export const PresentationTitle = styled.div`
  font-size: 36px;
  color: orange;
`;
export const PresentationDate = styled.div`
  color: grey;
  font-size: 15px;
`;
