import React, { useState } from "react";
import styled from "@emotion/styled";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import { Box, IconButton, Button, Grid } from "@mui/material";
import theme from "../../style/theme";
import { Link } from "react-router-dom";
export default function RequestCardUser({ title, coachName, type }) {
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
        <RequestCardWrap>
          <PaddingWrap>
            <div className="coach-img"></div>
            <div className="coach-info">
              <div className="dp-flex">
                <h2>
                  <strong>{title}</strong>
                </h2>
                {type === "done" ? (
                  <div className="feedBack-done">
                    <h4>피드백 완료</h4>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <h3>
                <strong>{coachName}</strong> 코치
              </h3>
              {type === "ing" ? <FeedBackIng>피드백 중</FeedBackIng> : <></>}
              {type === "REQUESTED" ? <Waiting>수락대기</Waiting> : <></>}
              {type === "reject" ? <Reject>거절</Reject> : <></>}
              {type === "done" ? (
                <>
                  <Link href="">
                    <Done>바로가기</Done>
                  </Link>
                </>
              ) : (
                <></>
              )}
            </div>
          </PaddingWrap>
        </RequestCardWrap>
      </ThemeProvider>
    </>
  );
}

const RequestCardWrap = styled(Box)`
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  .coach-img {
    width: 30%;
    height: 15rem;
    background-image: url(../img/coachSample.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 4px;
  }
  .coach-info {
    width: 67%;
    strong {
      font-weight: bold;
    }
    .dp-flex {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }
    h2 {
      font-size: 2rem;
      color: #3b3b3b;
      line-height: 130%;
    }
    h3 {
      font-size: 1.8rem;
      color: #3b3b3b;
      line-height: 150%;
      margin: 1rem 0 2rem 0;
    }
    .feedBack-done {
      padding: 0.5rem 1rem;
      border-radius: 100px;
      background-color: #ff7134;
      width: fit-content;
      h4 {
        font-size: 1.4rem;
        color: #fff;
        font-weight: 600;
      }
    }
  }
  @media ${() => theme.device.mobile} {
    .coach-info {
      h3 {
        margin: 0.5rem 0;
      }
      h2 {
        font-size: 1.8rem;
      }
      .dp-flex {
        flex-direction: column-reverse;
      }
      .feedBack-done {
        margin-bottom: 0.5rem;
        h4 {
          font-size: 1.2rem;
        }
      }
    }
    .coach-img {
      height: 13rem;
    }
  }
  @media ${() => theme.device.mobile3} {
    .coach-img {
      height: 8rem;
    }
  }
`;

const PaddingWrap = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem;
  @media ${() => theme.device.mobile} {
    align-items: flex-start;
    padding: 2rem;
  }
`;

const FeedBackIng = styled(Box)`
  padding: 1rem 2rem;
  border: 1px solid #ff7134;
  color: #ff7134;
  background-color: #fff8f3;
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  border-radius: 4px;

  @media ${() => theme.device.mobile} {
    font-size: 1.4rem;
    padding: 0.8rem 2rem;
    margin-top: 1rem;
    width: auto;
  }
`;

const Waiting = styled(Box)`
  padding: 1rem 2rem;
  border: 1px solid #0fb20b;
  color: #0fb20b;
  background-color: #eafee9;
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  border-radius: 4px;

  @media ${() => theme.device.mobile} {
    font-size: 1.4rem;
    padding: 0.8rem 2rem;
    margin-top: 1rem;
    width: auto;
  }
`;

const Reject = styled(Box)`
  padding: 1rem 2rem;
  border: 1px solid #a6a6a6;
  color: #fff;
  background-color: #a6a6a6;
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  border-radius: 4px;

  @media ${() => theme.device.mobile} {
    font-size: 1.4rem;
    padding: 0.8rem 2rem;
    margin-top: 1rem;
    width: auto;
  }
`;

const Done = styled(Box)`
  padding: 1rem 2rem;
  border: 1px solid #ff7134;
  color: #ff7134;
  background-color: #fff;
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  border-radius: 4px;

  @media ${() => theme.device.mobile} {
    font-size: 1.4rem;
    padding: 0.8rem 2rem;
    margin-top: 1rem;
    width: auto;
  }
`;
