import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, IconButton, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import theme from "../../style/theme";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function JoinModal() {
  const [open, setOpen] = useState(false);
  const [coach, setCoach] = useState(false);
  const [select, setSelect] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCoach(false);
  };

  const handleCoach = () => {
    setCoach(!coach);
  };

  const theme2 = createTheme({
    typography: {
      fontFamily: "Pretendard",
    },
    palette: {
      primary: {
        main: "#FF7134",
      },
    },
  });
  const join = () => {};

  return (
    <ThemeProvider theme={theme2}>
      <JoinModalWrap>
        <ModalBtn onClick={handleClickOpen}>회원가입</ModalBtn>
        <StyledDialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <JoinContent>
            <div className="title">
              {!coach ? <h1>회원가입</h1> : <h1>코치 회원가입</h1>}
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className="select-option">
              {!coach && (
                <Button onClick={handleCoach}>코치로 가입하시나요?</Button>
              )}
            </div>
            <div className="join-input-wrap">
              <ul className="input-wrap">
                <li>
                  <h3>이메일</h3>
                  <div className="input-btn-wrap">
                    <StyledTextField
                      id="id"
                      variant="outlined"
                      type="text"
                      placeholder="아이디를 입력하세요"
                      fullWidth
                    />
                    <Button variant="contained">인증</Button>
                  </div>
                </li>
                <li>
                  <h3>비밀번호</h3>
                  <StyledTextField
                    id="pw"
                    variant="outlined"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    fullWidth
                  />
                </li>
                <li>
                  <h3>비밀번호 확인</h3>
                  <StyledTextField
                    id="pw2"
                    variant="outlined"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    fullWidth
                  />
                </li>
                <li>
                  <h3>전화번호</h3>
                  <StyledTextField
                    id="number"
                    variant="outlined"
                    type="text"
                    placeholder="'-'제외하고 입력하세요"
                    fullWidth
                  />
                </li>
                {coach && (
                  <>
                    <li>
                      <h3>닉네임</h3>
                      <div className="input-btn-wrap">
                        <StyledTextField
                          id="id"
                          variant="outlined"
                          type="text"
                          placeholder="아이디를 입력하세요"
                          fullWidth
                        />
                        <Button variant="contained">중복확인</Button>
                      </div>
                    </li>
                    <li>
                      <h3>코칭 분야 선택</h3>
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
                  </>
                )}
              </ul>
              <ul className="checkbox-wrap">
                <li>
                  <FormControlLabel
                    control={<Checkbox defaultChecked size="large" />}
                    label="이용약관에 동의합니다."
                  />
                  <a href="">이용약관</a>
                </li>
                {!coach && (
                  <li>
                    <FormControlLabel
                      control={<Checkbox defaultChecked size="large" />}
                      label="서비스 품질 향상을 위한 스피치 데이터 사용을 허가 합니다."
                    />
                    <IconButton>
                      <ErrorOutlineIcon />
                    </IconButton>
                  </li>
                )}
              </ul>
            </div>
            <JoinBtn variant="contained" onClick={join}>
              회원가입
            </JoinBtn>
          </JoinContent>
        </StyledDialog>
      </JoinModalWrap>
    </ThemeProvider>
  );
}

const JoinModalWrap = styled(Box)``;

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    width: 75rem;
    max-width: 75rem;
  }
`;

const ModalBtn = styled(Button)`
  font-size: 1.4rem;
  color: #ff7134;
  text-decoration: underline;
`;

const JoinContent = styled(DialogContent)`
  padding: 7rem 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    border-bottom: 2px solid #ff7134;
    h1 {
      font-size: 2rem;
      color: #ff7134;
      font-weight: 600;
    }
    svg {
      width: 2rem;
      height: 2rem;
    }
  }
  .select-option {
    margin-bottom: 2rem;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
    button {
      font-size: 1.6rem;
      font-weight: 700;
      color: #ff7134;
      line-height: 150%;
      text-decoration: underline;
      text-align: right;
      cursor: pointer;
    }
  }
  .join-input-wrap {
    width: 100%;
    margin-bottom: 3rem;
    .input-wrap {
      margin-bottom: 3rem;
      li {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 2rem;
        h3 {
          width: 18rem;
          font-size: 1.6rem;
          color: #3b3b3b;
          font-weight: 600;
        }
        .input-btn-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          button {
            color: #fff;
            font-size: 1.6rem;
            font-weight: 600;
            box-shadow: none;
            padding: 1rem 2rem;
            width: 15rem;
            margin-left: 1rem;
          }
        }
      }
    }
    .checkbox-wrap {
      padding-bottom: 3rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      li {
        padding: 0.8rem 2rem;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .MuiFormControlLabel-label {
          font-size: 1.6rem;
          color: #3b3b3b;
        }
        a {
          font-size: 1.4rem;
          color: #838383;
          font-weight: 500;
          text-decoration: underline;
        }
        button {
          svg {
            width: 2rem;
            height: 2rem;
          }
        }
      }
      li:first-of-type {
        margin-bottom: 1rem;
      }
    }
  }
  @media ${() => theme.device.mobile} {
    justify-content: flex-start;
    padding: 2rem;
    .join-input-wrap {
      .input-wrap {
        li {
          flex-direction: column;
          align-items: flex-start;
          h3 {
            margin-bottom: 1rem;
          }
        }
      }
    }
  }
`;

const StyledTextField = styled(TextField)`
  input {
    font-size: 16px;
    color: #3b3b3b;
    padding: 1.2rem 2rem;
  }
`;

const JoinBtn = styled(Button)`
  box-shadow: none;
  color: #fff;
  font-size: 1.8rem;
  padding: 1rem 2rem;
  width: 38rem;
  @media ${() => theme.device.mobile} {
    width: 100%;
  }
`;

const StyledSelect = styled(Select)`
  font-size: 1.4rem;
`;

const StyledMenuItem = styled(MenuItem)`
  font-size: 1.4rem;
`;
