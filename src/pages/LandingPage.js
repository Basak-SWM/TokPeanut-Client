import React, { useState } from "react";
import styled from "@emotion/styled";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import { Box, IconButton, Button } from "@mui/material";
import Nav from "../component/layout/Nav";
import theme from "../style/theme";
import FilledBtn from "../component/button/FilledBtn";

const LandingPage = () => {
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
        <Nav />
        <Container>
          <div className="section mt-5">
            <div>
              <h2>톡피넛은 가능해요</h2>
              <h1>
                집에서 받아보는 <br />
                <strong>피드백</strong>
              </h1>
              <div className="img-box">
                <img src="/img/landing/img1.png" />
              </div>
            </div>
          </div>
        </Container>
        <Background>
          <Container>
            <div className="section">
              <div>
                <h2>톡피넛은 가능해요</h2>
                <h1>
                  부담 없는 <strong>반복 연습</strong>
                </h1>
                <div className="img-box">
                  <img src="/img/landing/img2.png" />
                </div>
              </div>
            </div>
          </Container>
        </Background>
        <Container>
          <div className="section">
            <div>
              <h2>톡피넛은 가능해요</h2>
              <h1>
                시공간의 제약이 없는
                <br /> <strong>전문가 피드백</strong>
              </h1>
              <div className="img-box">
                <img src="/img/landing/img3.png" />
              </div>
            </div>
          </div>
        </Container>
        <Divider />
        <Container>
          <div className="banner">
            <div className="bubble-wrap">
              <div className="speechBubble">
                <img src="/img/landing/speechBubble1.png" />
              </div>
              <div className="speechBubble">
                <img src="/img/landing/speechBubble2.png" />
              </div>
            </div>
          </div>
        </Container>
        <Banner>
          <Container>
            <div className="text-wrap">
              <div className="text">
                <h3>
                  톡피넛,
                  <br />
                  <strong>지금 바로 시작하세요</strong>
                </h3>
              </div>
              <FilledBtn text={"시작하기"} />
            </div>
          </Container>
        </Banner>
      </ThemeProvider>
    </>
  );
};

const Container = styled(Box)`
  width: 118rem;
  margin: 0 auto;
  .mt-5 {
    margin-top: 5rem;
  }
  .border-bottom {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .section {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    h2 {
      font-size: 3rem;
      color: #3b3b3b;
      line-height: 150%;
      font-weight: 400;
    }
    br {
      display: none;
    }
    h1 {
      font-size: 5rem;
      color: #3b3b3b;
      line-height: 150%;
      font-weight: 700;
      strong {
        color: #ff7134;
      }
    }
    .img-box {
      margin-top: 4rem;
      img {
        box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
        width: 100%;
        border-radius: 10px;
      }
    }
  }
  .section > div {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
  }
  .banner {
    background-image: url(../img/landing/banner.png);
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
    height: 45rem;
    margin-top: 10rem;
    .bubble-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90rem;
      margin: 0 auto;
      img {
        width: 100%;
      }
    }
  }

  @media ${() => theme.device.desktop} {
    width: 100%;
    .section {
      padding: 10rem 3%;
    }
  }
  @media ${() => theme.device.tablet} {
    .section {
      height: auto;
      padding: 10rem 5%;
      h1 {
        font-size: 3.5rem;
        line-height: 130%;
      }
    }
    .banner {
      .bubble-wrap {
        width: 90%;
      }
    }
  }
  @media ${() => theme.device.mobile} {
    .section {
      padding: 6rem 5%;
      br {
        display: block;
      }
      h2 {
        font-size: 2rem;
      }
    }
    .banner {
      height: 30rem;
      margin-top: 8rem;
    }
  }
`;

const Background = styled(Box)`
  background-color: #fff8f3;
`;

const Banner = styled(Box)`
  background: rgb(255, 113, 52);
  background: linear-gradient(
    45deg,
    rgba(255, 113, 52, 1) 30%,
    rgba(255, 170, 71, 1) 100%
  );
  padding: 10rem 0;
  .text-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .text {
      h3 {
        line-height: 140%;
        color: #fff;
        font-size: 5rem;
        strong {
          font-weight: bold;
        }
      }
    }
    button {
      width: 18%;
    }
  }
  @media ${() => theme.device.desktop} {
    padding: 10rem 3%;
  }
  @media ${() => theme.device.tablet} {
    padding: 8rem 3%;
    .text-wrap {
      button {
        width: 30%;
      }
    }
  }
  @media ${() => theme.device.mobile} {
    padding: 6rem 5%;
    .text-wrap {
      flex-direction: column;
      align-items: flex-start;
      .text {
        h3 {
          font-size: 3.5rem;
          line-height: 130%;
        }
      }
      button {
        margin-top: 3rem;
        width: 50%;
      }
    }
  }
`;

export default LandingPage;
