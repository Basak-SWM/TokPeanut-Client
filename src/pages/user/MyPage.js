import React, { useState } from "react";
import styled from "@emotion/styled";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import { Box, IconButton, Button, Grid } from "@mui/material";
import Nav from "../../component/layout/Nav";
import theme from "../../style/theme";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";

const Mypage = () => {
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

  const [select, setSelect] = React.useState("");
  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Nav />
        <Container>
          <div className="title">
            <h1>
              <strong>용감쿠 </strong>코치의 마이페이지
            </h1>
          </div>
          <Content>
            <div className="profile-img"></div>
            <div className="my-info">
              <h2>내정보</h2>
              <ul className="info-box">
                <li>
                  <h3>닉네임</h3>
                  <div className="input-btn-wrap">
                    <StyledTextField
                      id="nickName"
                      variant="outlined"
                      type="text"
                      placeholder="명쿠랑결혼할까"
                      fullWidth
                    />
                    <Button variant="contained">변경</Button>
                  </div>
                </li>
                <li>
                  <h3>한줄 소개</h3>
                  <StyledTextField
                    id="info"
                    variant="outlined"
                    type="text"
                    placeholder="용감하게!"
                    fullWidth
                  />
                </li>
                <li>
                  <h3>코칭 분야</h3>
                  <FormControl fullWidth>
                    <StyledSelect
                      value={select}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <StyledMenuItem value="">
                        <em>선택</em>
                      </StyledMenuItem>
                      <StyledMenuItem value={10}>분야</StyledMenuItem>
                      <StyledMenuItem value={20}>분야</StyledMenuItem>
                      <StyledMenuItem value={30}>분야</StyledMenuItem>
                    </StyledSelect>
                  </FormControl>
                </li>
                <li>
                  <h3>포트폴리오</h3>
                  <div className="w-100">
                    <Link to="/user/portfolio/update">포트폴리오 수정</Link>
                  </div>
                </li>
              </ul>
              <h2>계정</h2>
              <ul className="info-box">
                <li>
                  <h3>아이디</h3>
                  <div className="w-100">
                    <h3>example@gmail.com</h3>
                  </div>
                </li>
                <li>
                  <h3>비밀번호</h3>
                  <div className="w-100">
                    <Link to="">비밀번호 변경</Link>
                  </div>
                </li>
              </ul>
              <h2>크레딧</h2>
              <ul className="info-box">
                <li>
                  <div className="icon-wrap">
                    <img src="/img/icon/credit.svg" />
                    <div className="text">
                      <h5>사용가능 크레딧</h5>
                      <h4>354,625</h4>
                    </div>
                  </div>
                  <Button variant="contained">출금신청</Button>
                </li>
              </ul>
              <div className="end-btn">
                <SaveBtn variant="outlined">저장</SaveBtn>
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
  .profile-img {
    width: 25%;
    height: 28rem;
    border-radius: 1rem;
    background-image: url(../img/coachSample.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .my-info {
    width: 73%;
    h2 {
      font-size: 2rem;
      color: #3b3b3b;
      font-weight: bold;
      line-height: 150%;
      margin-bottom: 1rem;
    }
    .info-box {
      padding: 3rem;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      margin-bottom: 3rem;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
        h3 {
          font-size: 1.6rem;
          color: #3b3b3b;
          font-weight: 500;
          min-width: 15rem;
        }
        .input-btn-wrap {
          display: flex;
          align-items: center;
          width: 100%;
          button {
            color: #fff;
            font-size: 1.6rem;
            font-weight: 600;
            box-shadow: none;
            padding: 1rem 3rem;
            width: 15rem;
            margin-left: 1rem;
          }
        }
        .w-100 {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          width: 100%;
          a {
            font-size: 1.6rem;
            color: #ff7134;
            font-weight: bold;
            text-decoration: underline;
          }
        }
        .icon-wrap {
          display: flex;
          align-items: center;
          .text {
            margin-left: 1rem;
            h5 {
              font-size: 1.6rem;
              color: #3b3b3b;
              line-height: 150%;
            }
            h4 {
              font-size: 3rem;
              color: #3b3b3b;
              font-weight: bold;
            }
          }
        }
        button {
          color: #fff;
          box-shadow: none;
          padding: 1rem 2rem;
          font-size: 1.6rem;
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
    /* flex-direction: column; */
    .profile-img {
      width: 18%;
      height: 15rem;
    }
    .my-info {
      width: 80%;
      .info-box {
        li {
          h3 {
            min-width: 10rem;
          }
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
    .my-info {
      width: 100%;
      margin-top: 3rem;
      .info-box {
        padding: 2rem;
        li {
          flex-direction: column;
          align-items: flex-start;
          h3 {
            margin-bottom: 1rem;
          }
          .icon-wrap {
            margin-bottom: 2rem;
          }
          button {
            width: 100%;
          }
        }
      }
    }
    .profile-img {
      width: 18rem;
      height: 18rem;
    }
  }
`;
const StyledTextField = styled(TextField)`
  input {
    font-size: 1.6rem;
    color: #3b3b3b;
    padding: 1.2rem 2rem;
  }
`;
const StyledSelect = styled(Select)`
  font-size: 1.4rem;
  & > div {
    padding: 1.35rem 2rem;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  font-size: 1.4rem;
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

export default Mypage;
