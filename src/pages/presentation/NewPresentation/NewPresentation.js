import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import * as s from "./NewPresentationStyle";
import axios from "axios";

import styled from "@emotion/styled";
import { createTheme, ThemeProvider } from "@mui/material";
import { createGlobalStyle } from "styled-components";
import { Box, IconButton, Button } from "@mui/material";
import Nav from "../../layout/Nav";
import theme from "../../../style/theme";
import CircleIcon from "@mui/icons-material/Circle";
import TextField from "@mui/material/TextField";

const NewPresentation = () => {
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
  const [title, setTitle] = useState(""); // 제목
  const [outline, setOutline] = useState(""); // 개요
  const [checkpoint, setCheckpoint] = useState(""); // 잘 하고싶은 부분
  const navigate = useNavigate();

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeOutline = (e) => {
    setOutline(e.target.value);
  };
  const onChangeCheckpoint = (e) => {
    setCheckpoint(e.target.value);
  };

  const createPresentation = async (e) => {
    e.preventDefault();
    let res = null;
    try {
      res = await axios.post("/presentations", {
        accountUuid: "b646969a-c87d-482f-82c5-6ec89c917412",
        presentation: {
          title: title,
          outline: outline,
          checkpoint: checkpoint,
        },
      });
      console.log("new presentation response:", res);
    } catch (err) {
      console.log("new presentation error: ", err);
    }
    // 새로 생성된 presentation의 id를 받아서 practice 페이지로 이동
    const presentation_id = res.data.id;
    navigate(`/presentation/new/practice?presentation_id=${presentation_id}`);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Nav />
        <Container>
          <CreateWrap>
            <div className="title">
              <h1>프레젠테이션 생성</h1>
            </div>
            <form onSubmit={createPresentation}>
              <ul className="create-list">
                <li>
                  <div className="sub-title">
                    <CircleIcon />
                    <h2>제목</h2>
                  </div>
                  <StyledTextField
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="제목을 입력하세요."
                    onChange={onChangeTitle}
                    maxLength={20}
                    required
                    fullWidth
                  />
                </li>
                <li>
                  <div className="sub-title">
                    <CircleIcon />
                    <h2>스피치 개요</h2>
                  </div>
                  <StyledTextField2
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="스피치 개요를 작성하세요. EX) 암호학에 관한 발표입니다."
                    onChange={onChangeOutline}
                    fullWidth
                    multiline
                    // maxRows={4}
                    maxLength={8000}
                  />
                </li>
                <li>
                  <div className="sub-title">
                    <CircleIcon />
                    <h2>잘 하고 싶은 부분</h2>
                  </div>
                  <StyledTextField2
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="잘 하고 싶은 부분을 작성하세요. EX) 전문적인 분위기로 발표하고 싶어요"
                    onChange={onChangeCheckpoint}
                    fullWidth
                    multiline
                    maxRows={4}
                    maxLength={8000}
                  />
                </li>
              </ul>
              <div className="center-btn">
                <Button type="submit" variant="contained">
                  스피치 시작하기
                </Button>
              </div>
            </form>
          </CreateWrap>
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
  width: 118rem;
  margin: 13rem auto 10rem auto;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.05);
  @media ${() => theme.device.desktop} {
    width: 90%;
  }
  @media ${() => theme.device.mobile} {
    margin-bottom: 5rem;
  }
`;

const CreateWrap = styled(Box)`
  padding: 5rem;
  .title {
    padding-bottom: 2rem;
    margin-bottom: 3rem;
    border-bottom: 2px solid #ff7134;
    h1 {
      font-size: 2.5rem;
      color: #3b3b3b;
      font-weight: bold;
      line-height: 150%;
      text-align: center;
    }
  }
  .create-list {
    li {
      margin-bottom: 2rem;
      .sub-title {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        svg {
          color: #ff7134;
          width: 1.5rem;
          height: 1.5rem;
          margin-right: 1rem;
        }
        h2 {
          font-size: 1.8rem;
          color: #3b3b3b;
          line-height: 150%;
          font-weight: 600;
        }
      }
    }
    li:last-of-type {
      margin: 0;
    }
  }
  .center-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
    button {
      box-shadow: none;
      color: #fff;
      font-size: 1.6rem;
      padding: 1rem 5rem;
    }
  }
  @media ${() => theme.device.mobile} {
    padding: 3rem;
    .title {
      h1 {
        font-size: 2rem;
      }
    }
    .center-btn {
      button {
        width: 100%;
      }
    }
  }
`;

const StyledTextField = styled(TextField)`
  input {
    font-size: 1.6rem;
    line-height: 150%;
  }
`;

const StyledTextField2 = styled(TextField)`
  textarea {
    height: 25rem !important;
    font-size: 1.6rem;
    line-height: 150%;
  }
`;

export default NewPresentation;
