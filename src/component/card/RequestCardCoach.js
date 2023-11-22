import React, { useState } from "react";
import styled from "@emotion/styled";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import { Box, IconButton, Button, Grid } from "@mui/material";
import theme from "../../style/theme";

export default function RequestCardCoach({ userName, type }) {
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
        <RequestCardWrap>
          <PaddingWrap>
            <div className="left-box">
              <div className="profile">
                <img src="/img/icon/account.svg" alt="" />
              </div>
              <h2>
                <strong>{userName}</strong> <br />
                고객님
              </h2>
            </div>
            <div className="right-box">
              {type === "REQUESTED" ? (
                <>
                  <Button variant="outlined" color="secondary" fullWidth>
                    스크립트보기
                  </Button>
                  <div className="btn-wrap">
                    <Button variant="contained">수락</Button>
                    <Button variant="outlined">거절</Button>
                  </div>
                </>
              ) : (
                <></>
              )}
              {type === "after" ? (
                <>
                  <FeedBackBtn variant="contained">피드백 하기</FeedBackBtn>
                  <Accept>수락함</Accept>
                </>
              ) : (
                <></>
              )}
              {type === "reject" ? (
                <>
                  <Reject>거절함</Reject>
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
  .left-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    height: 100%;
    width: 25%;
    border-right: 1px solid rgba(0, 0, 0, 0.15);
    .profile {
      margin-bottom: 0.5rem;
      img {
        width: 7rem;
        height: 7rem;
        border-radius: 100px;
      }
    }
    h2 {
      br {
        display: none;
      }
      font-size: 2rem;
      color: #3b3b3b;
      line-height: 150%;
      text-align: center;
      strong {
        font-weight: bold;
      }
    }
  }
  .right-box {
    width: 63%;
    padding: 3rem;
    button {
      box-shadow: none;
      padding: 1rem 2rem;
      font-size: 1.6rem;
    }
    button:first-of-type {
      color: #3b3b3b;
    }
    .btn-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 1rem;
      button:first-of-type {
        color: #fff;
      }
      button {
        width: 48%;
      }
    }
  }
  @media ${() => theme.device.mobile} {
    .left-box {
      padding: 2rem;
      .profile {
        img {
          width: 6rem;
          height: 6rem;
        }
      }
      h2 {
        br {
          display: block;
        }
        font-size: 1.6rem;
      }
    }
  }
  .right-box {
    padding: 2rem;
    button {
      box-shadow: none;
      padding: 0.8rem 2rem;
    }
  }
`;

const PaddingWrap = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FeedBackBtn = styled(Button)`
  font-size: 1.6rem;
  color: #ff7134 !important;
  padding: 1rem 2rem;
  background-color: #fff8f3;
  width: 100%;
  margin-bottom: 1rem;
  &:hover {
    color: #fff !important;
    background-color: #ff7134;
  }
  @media ${() => theme.device.mobile} {
    padding: 0.8rem 1rem;
  }
`;
const Accept = styled(Box)`
  padding: 1.5rem 2rem;
  background-color: #eafee9;
  color: #0fb20b;
  font-size: 1.6rem;
  text-align: center;
  width: auto;
  border-radius: 4px;
  @media ${() => theme.device.mobile} {
    padding: 1.2rem 1rem;
  }
`;

const Reject = styled(Box)`
  font-size: 1.6rem;
  color: #3b3b3b;
  background-color: #f2f3f4;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 10.5rem;
  border-radius: 4px;
`;
