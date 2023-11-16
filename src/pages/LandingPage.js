import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled/macro";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import { Box, IconButton, Button } from "@mui/material";
import Nav from "../component/layout/Nav";
import theme from "../style/theme";
import FilledBtn from "../component/button/FilledBtn";
import Aos from "aos";
import "aos/dist/aos.css";

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

  const navigate = useNavigate();

  useEffect(() => {
    // Aos.init({ duration: 800 });
    Aos.init();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Main>
          <div className="title">
            <h1 data-aos="zoom-in" data-aos-once="false">
              TokPeanut
            </h1>
            <h2
              data-aos="fade-up"
              data-aos-once="false"
              data-aos-easing="ease"
              data-aos-delay="400"
            >
              Talking & speaking in Nutshell
            </h2>
          </div>
          <div
            className="scroll"
            data-aos="fade-up"
            data-aos-once="false"
            data-aos-easing="ease"
            data-aos-delay="600"
          >
            <span>SCROLL DOWN</span>
            <span className="arrow" />
          </div>
        </Main>
        {/* <Nav /> */}
        <Container $type="left">
          <div className="section">
            <div data-aos="fade-right" data-aos-once="false">
              {/* <h2>톡피넛은 가능해요</h2> */}
              <h1>
                집에서 받아보는 <br />
                <strong>피드백</strong>
              </h1>
              <div className="img-box" data-aos="fade-up" data-aos-once="false">
                <img src="/img/landing/img1.png" alt="img" />
              </div>
            </div>
          </div>
        </Container>
        <Container $bgc="#fff8f3" $type="right">
          {/* <Background> */}
          <div className="section">
            <div data-aos="fade-left" data-aos-once="false">
              {/* <h2>톡피넛은 가능해요</h2> */}
              <h1>
                부담 없는 <strong>반복 연습</strong>
              </h1>
              <div className="img-box" data-aos="fade-up" data-aos-once="false">
                <img src="/img/landing/img2.png" alt="img" />
              </div>
            </div>
          </div>
          {/* </Background> */}
        </Container>

        <Container $type="left">
          <div className="section">
            <div data-aos="fade-right" data-aos-once="false">
              {/* <h2>톡피넛은 가능해요</h2> */}
              <h1>
                시공간의 제약 없는
                <br /> <strong>전문가 피드백</strong>
              </h1>
              <div className="img-box" data-aos="fade-up" data-aos-once="false">
                <img src="/img/landing/img3.png" alt="img" />
              </div>
            </div>
          </div>
        </Container>

        {/* <Divider /> */}

        <Banner>
          <div className="text-wrap">
            <div className="text">
              <h3>
                톡피넛,
                <br />
                <strong>지금 바로 시작하세요</strong>
              </h3>
            </div>
            <FilledBtn text={"시작하기"} onClick={() => navigate("/login")} />
          </div>
        </Banner>
      </ThemeProvider>
    </>
  );
};

const Main = styled(Box)`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  .title {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: column;
    h1 {
      margin-top: 30rem;
      font-size: 9rem;
      color: #ff7134;
      /* color: white; */
      line-height: 150%;
      font-weight: 1000;
    }
    h2 {
      margin-top: 2rem;
      font-size: 2rem;
      color: #3b3b3b;
      /* color: white; */
      line-height: 150%;
      font-weight: 500;
    }
  }

  .scroll {
    @keyframes Scrolling {
      0% {
        transform: rotate(-45deg) translate(0, 0);
      }
      50% {
        transform: rotate(-45deg) translate(-0.5rem, 0.5rem);
      }
      100% {
        transform: rotate(-45deg) translate(0, 0);
      }
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #3b3b3b;
    margin-bottom: 5rem;
    span {
      color: #3b3b3b;
      font-size: 1.5rem;
      font-weight: 500;
      margin-bottom: 2rem;
    }
    .arrow {
      width: 2rem;
      height: 2rem;
      /* margin-left: -1rem; */
      border-left: 1px solid #ff7134;
      border-bottom: 1px solid #ff7134;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      animation: Scrolling 1.5s infinite linear;
      box-sizing: border-box;
    }
  }
`;

const Container = styled(Box)`
  ${(props) => props.$bgc && `background-color: ${props.$bgc};`}
  width: 100rem;
  margin: 0 auto;
  .border-bottom {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .section {
    height: 60vh;
    /* width: 100%; */
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
      display: flex;
      align-items: ${(props) =>
        props.$type === "left" ? "flex-start" : "flex-end"};
      justify-content: center;
      flex-direction: column;
      img {
        box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
        width: 80%;
        border-radius: 10px;
      }
    }
  }
  .section > div {
    display: flex;
    align-items: ${(props) =>
      props.$type === "left" ? "flex-start" : "flex-end"};
    justify-content: center;
    flex-direction: column;
    width: 80%;
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

const Banner = styled(Box)`
  margin-top: 10vh;
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
