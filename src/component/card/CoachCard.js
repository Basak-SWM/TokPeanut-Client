import React, { useState } from "react";
import styled from "@emotion/styled";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import { Box, IconButton, Button } from "@mui/material";
import theme from "../../style/theme";
import { Link } from "react-router-dom";
import CoachingModal from "../modal/CoachingModal";
import SpeechModal from "../modal/SpeechModal";

export default function CoachCard({ profile, n }) {
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
        <CoachCardWrap props={{ bgUrl: `../img/coach${n}.png` }}>
          <Link to={`/coach/portfolio?uuid=${profile.uuid}`}>
            <div className="img-box" id="img1"></div>
          </Link>
          <h2>
            <strong>{profile.nickname}</strong> 코치
          </h2>
          <p>{profile.shortIntroduce}&nbsp;</p>
          <div className="btn-wrap">
            <CoachingModal />
            <SpeechModal />
          </div>
        </CoachCardWrap>
      </ThemeProvider>
    </>
  );
}

const CoachCardWrap = styled(Box)`
  .img-box {
    margin-bottom: 2rem;
    width: 100%;
    height: 23rem;
    border-radius: 1rem;
  }
  #img1 {
    background-image: url(${({ props }) => props.bgUrl});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
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
    color: #808080;
    line-height: 140%;
    margin-top: 0.5rem;
  }
  .btn-wrap {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    & > div {
      width: 49%;
    }
    button {
      width: 100%;
    }
  }
  @media ${() => theme.device.mobile} {
    .img-box {
      height: 15rem;
    }
    h2 {
      font-size: 1.8rem;
    }
    p {
      font-size: 1.4rem;
    }
  }
`;
