import styled from "styled-components";

// 전체 페이지
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 90vh;
`;

// 페이지 제목
export const Title = styled.div`
  border-bottom: 2px solid orange;
  width: 1000px;
  height: 20px;
  padding: 15px 0 15px 0;
  font-size: 20px;
`;

// 정보 입력 컨테이너
export const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;
export const InputBox = styled.input.attrs((props) => ({
  type: "text",
  placeholder: props.placeholder,
}))`
  width: 980px;
  height: ${(props) => props.height};
  border: 1px solid grey;
  border-radius: 3px;
  margin: 10px;
  padding: 10px;
  color: grey;
`;

export const Button = styled.button`
  width: 150px;
  height: 50px;
  border: 1px solid orange;
  border-radius: 3px;
  margin: 10px;
  padding: 10px;
  color: orange;
  background-color: white;
`;
