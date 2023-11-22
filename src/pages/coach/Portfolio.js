import React, { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import { Box, IconButton, Button, Grid } from "@mui/material";
import Nav from "../../component/layout/Nav";
import theme from "../../style/theme";
import CoachingModal from "../../component/modal/CoachingModal";
import SpeechModal from "../../component/modal/SpeechModal";
import api from "../../api";
import { useLocation } from "react-router-dom";
import qs from "qs";

const Portfolio = () => {
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

  const location = useLocation();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const coachUuid = query.uuid;

  const [portfolio, setPortfolio] = useState({
    acceptCount: null,
    introduce: "",
    nickname: "",
    shortIntroduce: "",
    speciality: "",
    username: "",
    uuid: "",
    youtubeUrl: "",
  });
  const getPortfolio = useCallback(async () => {
    try {
      const res = await api.get(`/coach-profile/${coachUuid}`);
      setPortfolio(res.data);
      console.log("portfolio res:", res);
    } catch (err) {
      console.log(err);
    }
  }, [setPortfolio, coachUuid]);
  useEffect(() => {
    getPortfolio();
  }, [getPortfolio]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Nav />
        <Container>
          <div className="title">
            <h1>코치 포트폴리오</h1>
          </div>
          <Content>
            <div className="profile-box">
              <div className="profile">
                <div className="profile-img">
                  <img src="/img/coachSample.png" width="100%" alt="" />
                </div>
                <div>
                  <h2>
                    <strong>{portfolio.nickname} </strong>
                    코치
                  </h2>
                  <p>{portfolio.shortIntroduce}</p>
                </div>
              </div>
              <div className="matching-box">
                <h2>톡피넛 매칭</h2>
                <h3>
                  {portfolio.acceptCount === null ? "0" : portfolio.acceptCount}
                  &nbsp;회
                </h3>
              </div>
              <div className="btn-wrap">
                <CoachingModal />
                <SpeechModal />
              </div>
            </div>
            <div className="portfolio-content">
              {/* <video></video> */}
              <div className="video">
                {/* <img src="/img/video.png" width="100%" height="100%" alt="" /> */}
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/UPx_FNT8vU0?si=A0NaL_kBF4FGLEhn"
                  // src={portfolio.youtubeUrl}
                  title="YouTube video player"
                  // frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <ul className="portfolio-list">
                <li>
                  <h3>전문 분야</h3>
                  <p>{portfolio.speciality}</p>
                </li>
                <li>
                  <h3>자기소개</h3>
                  <p>{portfolio.introduce}</p>
                </li>
              </ul>
            </div>
          </Content>
        </Container>
      </ThemeProvider>
    </>
  );
};

const Container = styled(Box)`
  width: 118rem;
  margin: 13rem auto 10rem auto;
  .title {
    padding-bottom: 1rem;
    border-bottom: 2px solid #ff7134;
    h1 {
      font-size: 2.5rem;
      color: #3b3b3b;
      font-weight: 700;
      line-height: 150%;
    }
  }
  @media ${() => theme.device.desktop} {
    width: 90%;
  }
`;

const Content = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 3rem 0;
  .profile-box {
    width: 28%;
    .profile-img {
      height: 35rem;
      margin-bottom: 2rem;
      img {
        border-radius: 1rem;
        height: 100%;
      }
    }
    h2 {
      font-size: 2rem;
      color: #3b3b3b;
      line-height: 150%;
      strong {
        font-weight: bold;
      }
    }
    p {
      font-size: 1.6rem;
      color: #838383;
      line-height: 140%;
      margin-top: 1rem;
    }
    .matching-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem 2rem;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      margin: 2rem 0 1rem 0;
      h3 {
        font-size: 2rem;
        font-weight: bold;
        color: #ff7134;
      }
    }
    .btn-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      & > div {
        width: 49%;
      }
    }
  }
  .portfolio-content {
    width: 70%;
    .video {
      height: 45rem;
      width: auto;
    }
    .portfolio-list {
      margin: 2rem 0;
      li {
        margin-bottom: 2rem;
        h3 {
          font-size: 2rem;
          color: #3b3b3b;
          line-height: 150%;
          padding-bottom: 1rem;
          width: 100%;
          font-weight: 700;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }
        p {
          font-size: 1.6rem;
          color: #3b3b3b;
          line-height: 140%;
        }
        audio {
          width: 100%;
        }
      }
      li:last-of-type {
        margin: 0;
      }
    }
  }
  @media ${() => theme.device.tablet} {
    flex-direction: column;
    .profile-box {
      width: 100%;
      .matching-box {
        padding: 1rem 2rem;
        h3 {
          font-size: 1.8rem;
        }
      }
      h2 {
        font-size: 1.6rem;
      }
      .profile {
        display: flex;
        align-items: center;
      }
      .profile-img {
        margin-right: 2rem;
        width: 25%;
        height: 15rem;
        margin-bottom: 0;
      }
    }
    .portfolio-content {
      width: 100%;
      margin-top: 3rem;
    }
  }
  @media ${() => theme.device.tablet} {
    .profile-box {
      .profile-img {
        height: 10rem;
      }
    }
    .portfolio-content {
      .video {
        width: auto;
        height: auto;
      }
    }
  }
`;

export default Portfolio;
