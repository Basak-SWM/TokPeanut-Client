import React, { useState } from "react";
import styled from "@emotion/styled";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import { Box, IconButton, Button, Grid } from "@mui/material";
import Nav from "../../component/layout/Nav";
import theme from "../../style/theme";
import TextField from "@mui/material/TextField";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { FileUpload } from "@mui/icons-material";

const UpdatePortfolio = () => {
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
          <div className="title">
            <h1>코치 프로필 수정</h1>
          </div>
          <Content>
            <div className="left-box">
              <div className="profile-img">
                <div className="modify-img">
                  <IconButton
                    variant="contained"
                    size="large"
                    component="label"
                  >
                    <CameraAltIcon />
                    <input id="file" type="file" hidden />
                  </IconButton>
                </div>
              </div>
              <div className="profile-info">
                <h2>
                  <strong>용감쿠 </strong>코치
                </h2>
                <div className="matching-box">
                  <h2>톡피넛 매칭</h2>
                  <h3>7회</h3>
                </div>
              </div>
            </div>
            <div className="right-box">
              <ul className="modify-list">
                <li>
                  <h3>한줄 소개</h3>
                  <StyledTextField
                    id="info"
                    variant="outlined"
                    type="text"
                    placeholder=""
                    fullWidth
                  />
                </li>
                <li>
                  <h3>목소리 소개</h3>
                  <div className="audio-wrap">
                    <audio controls>
                      <source src="" type="audio/ogg" />
                    </audio>
                    <Button variant="contained">새로 녹음</Button>
                  </div>
                </li>
                <li>
                  <h3>자기 소개</h3>
                  <StyledTextField
                    multiline
                    rows={5}
                    defaultValue="자기소개"
                    fullWidth
                  />
                </li>
                <li>
                  <h3>소개 영상</h3>
                  <div className="input-btn-wrap">
                    <StyledTextField
                      id="link"
                      variant="outlined"
                      type="text"
                      placeholder=""
                      fullWidth
                    />
                    <Button variant="contained">링크 가져오기</Button>
                  </div>
                </li>
              </ul>
              <div className="end-btn">
                <SaveBtn variant="outlined">변경사항 저장</SaveBtn>
              </div>
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
      strong {
        color: #ff7134;
      }
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
  .left-box {
    width: 25%;
    .profile-img {
      height: 28rem;
      border-radius: 1rem;
      background-image: url(../../img/coachSample.png); // ????
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      margin-bottom: 2rem;
      position: relative;
      .modify-img {
        background-color: #fff;
        border-radius: 100px;
        position: absolute;
        right: 2rem;
        bottom: 2rem;

        width: 5rem;
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          color: #ff7134;
          width: 3rem;
          height: 3rem;
        }
      }
    }
    h2 {
      font-size: 2.5rem;
      color: #3b3b3b;
      line-height: 150%;
      strong {
        font-weight: bold;
      }
    }
    .matching-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem 2rem;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      margin-top: 2rem;
      h2 {
        font-size: 2rem;
        color: #3b3b3b;
      }
      h3 {
        font-size: 2rem;
        font-weight: bold;
        color: #ff7134;
      }
    }
  }
  .right-box {
    width: 73%;
    .modify-list {
      li {
        padding: 3rem;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        margin-bottom: 2rem;
        h3 {
          font-size: 1.6rem;
          color: #3b3b3b;
          font-weight: 500;
          margin-bottom: 1rem;
        }
        button {
          color: #fff;
          font-size: 1.6rem;
          font-weight: 600;
          box-shadow: none;
          padding: 1rem;
          min-width: 13rem;
          margin-left: 1rem;
        }
        .input-btn-wrap {
          display: flex;
          align-items: center;
          width: 100%;
        }
        .audio-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
      li:last-of-type {
        margin: 0;
      }
    }
  }
  .end-btn {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
    margin-top: 5rem;
  }
  @media ${() => theme.device.tablet} {
    .left-box {
      .profile-img {
        height: 20rem;
      }
      h2 {
        font-size: 2rem;
      }
      .matching-box {
        padding: 1rem 2rem;
        h3 {
          font-size: 1.8rem;
        }
        h2 {
          font-size: 1.8rem;
        }
      }
    }
    .right-box {
      .modify-list {
        li {
          .input-btn-wrap {
            button {
              padding: 1rem 0;
              width: auto;
            }
          }
        }
      }
    }
  }
  @media ${() => theme.device.mobile} {
    flex-direction: column;
    .left-box {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
      .profile-img {
        width: 30%;
        height: 15rem;
        margin-bottom: 0;
        .modify-img {
          transform: translate(50%, -50%);
          right: 50%;
          top: 50%;
        }
      }
      .profile-info {
        margin-left: 2rem;
      }
      .matching-box {
        width: 100%;
      }
    }
    .right-box {
      width: 100%;
      .modify-list {
        li {
          padding: 2rem;
          button {
            font-size: 1.4rem;
            padding: 1rem 0;
            min-width: 10rem;
            width: 10rem;
          }
        }
      }
    }
  }
  @media ${() => theme.device.mobile2} {
    .left-box {
      .profile-img {
        width: 30%;
        height: 11rem;
      }
    }
  }
`;

const StyledTextField = styled(TextField)`
  input {
    font-size: 1.6rem;
    color: #3b3b3b;
    padding: 1.2rem 2rem;
  }
  textarea {
    font-size: 1.6rem;
    color: #3b3b3b;
  }
`;

const SaveBtn = styled(Button)`
  font-size: 1.6rem;
  box-shadow: none;
  width: 15rem;
  padding: 1rem 2rem;

  @media ${() => theme.device.mobile} {
    width: 100%;
  }
`;

export default UpdatePortfolio;
