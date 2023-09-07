import React, { useState } from "react";
import styled from "@emotion/styled";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import { createGlobalStyle } from "styled-components";
import { Box, IconButton, Button } from "@mui/material";
import Nav from "../../component/layout/Nav";
import theme from "../../style/theme";
import TextField from "@mui/material/TextField";
import JoinModal from "../../component/modal/JoinModal";

const Login = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "Pretendard",
    },
    palette: {
      primary: {
        main: "#FF7134",
      },
      secondary: {
        main: "#D9D9D9",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Nav />
        <LoginWrap>
          <LoginBox>
            <PaddingWrap>
              <h1>LOGIN</h1>
              <div className="input-wrap">
                <StyledTextField
                  id="id"
                  variant="outlined"
                  type="text"
                  placeholder="아이디를 입력하세요"
                  fullWidth
                />
                <StyledTextField
                  id="pw"
                  variant="outlined"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  fullWidth
                />
              </div>
              <div className="join-text">
                <h3>톡피넛이 처음이신가요?</h3>
                <JoinModal />
              </div>
              <LoginBtn variant="contained" fullWidth>
                로그인
              </LoginBtn>
              <Divider />
              <div className="social-login">
                <OutlinedBtn variant="outlined" color="secondary" fullWidth>
                  <img src="/img/logo/google.svg" />
                  구글로 시작하기
                </OutlinedBtn>
                <OutlinedBtn variant="outlined" color="secondary" fullWidth>
                  <img src="/img/logo/kakao.svg" />
                  카카오로 시작하기
                </OutlinedBtn>
              </div>
            </PaddingWrap>
          </LoginBox>
        </LoginWrap>
      </ThemeProvider>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
    body{
        background-color: #FAFAFA;
    }
`;

const LoginWrap = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginBox = styled(Box)`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.05);
  margin-top: 8rem;
  h1 {
    font-size: 4rem;
    color: #ff7134;
    font-weight: bold;
    line-height: 150%;
    margin-bottom: 5rem;
    text-align: center;
  }
  .input-wrap {
    & > div {
      margin-bottom: 1rem;
    }
  }
  .join-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    h3 {
      font-size: 1.4rem;
      color: #3b3b3b;
      line-height: 150%;
    }
  }
  .social-login {
    button:first-of-type {
      margin: 2rem 0 1rem 0;
    }
  }
  @media ${() => theme.device.mobile} {
    margin-top: 0;
    box-shadow: none;
    height: 100%;
    width: 100%;
  }
`;

const PaddingWrap = styled(Box)`
  padding: 10rem 8rem;
  @media ${() => theme.device.mobile} {
    padding: 10rem 2rem 0 2rem;
  }
`;

const LoginBtn = styled(Button)`
  box-shadow: none;
  font-size: 1.8rem;
  color: #fff;
  padding: 1.2rem 2rem;
  margin: 2rem 0;
`;

const OutlinedBtn = styled(Button)`
  color: #3b3b3b;
  padding: 1.2rem 2rem;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  img {
    margin-right: 1rem;
  }
`;

const StyledTextField = styled(TextField)`
  input {
    font-size: 1.6rem;
    color: #3b3b3b;
    padding: 1.2rem 2rem;
  }
`;

export default Login;
