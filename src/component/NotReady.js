import React from "react";
import peanut_run from "../image/peanut_run.png";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { createTheme, Box } from "@mui/material";
import Nav from "./layout/Nav";

const NotReady = () => {
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
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Nav />
        <Container>
          <div className="logo-box"></div>
          <h1>곧 서비스 제공 예정입니다.</h1>
        </Container>
      </ThemeProvider>
    </>
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <div>
    //     <h1>곧 서비스 제공 예정입니다.</h1>
    //   </div>
    //   <img src={peanut_run} width={600} alt="not ready" />
    //   <h1>아직 개발 중.</h1>
    // </div>
  );
};

const GlobalStyle = createGlobalStyle`
    body{
        background-color: #FAFAFA;
    }
`;
const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 90vh;
  .logo-box {
    @keyframes run {
      0% {
        background-position-x: 0px;
      }
      100% {
        background-position-x: -210vh;
      }
    }
    animation: run 0.6s infinite steps(7);
    background-image: url(${peanut_run});
    background-size: 210vh 30vh;
    height: 30vh;
    width: 30vh;
    will-change: transform;
  }
  h1 {
    font-size: 3rem;
    color: #ff7134;
    font-weight: bold;
    margin-top: 2rem;
    text-align: center;
  }
`;
export default NotReady;
