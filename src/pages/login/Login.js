import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import { createGlobalStyle } from "styled-components";
import { Box, IconButton, Button } from "@mui/material";
import Nav from "../../component/layout/Nav";
import theme from "../../style/theme";
import TextField from "@mui/material/TextField";
import JoinModal from "../../component/modal/JoinModal";
import api from "../../api";
import AuthContext from "../../AuthContext";

const Login = () => {
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
  const navigate = useNavigate();

  const { authInfo, setAuthInfo } = useContext(AuthContext);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const login = async () => {
    try {
      const res = await api.post("/accounts/login", {
        username: id,
        password: password,
      });

      const res_me = await api.get("/accounts/me");
      if (res_me.data.coachProfile) {
        setAuthInfo({ nickname: res_me.data.nickname, type: "coach" });
        navigate("/user/coachmatching");
      } else {
        setAuthInfo({ nickname: res_me.data.nickname, type: "user" });
        navigate("/presentation");
      }
    } catch (err) {
      alert("로그인에 실패했습니다. \nID와 PW를 확인하세요.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {/* <Nav /> */}
      <LoginWrap>
        <LoginBox>
          <PaddingWrap>
            <h1>TOKPEANUT</h1>
            <div className="input-wrap">
              <StyledTextField
                id="id"
                variant="outlined"
                type="text"
                placeholder="아이디를 입력하세요"
                fullWidth
                onChange={onChangeId}
              />
              <StyledTextField
                id="pw"
                variant="outlined"
                type="password"
                placeholder="비밀번호를 입력하세요"
                fullWidth
                onChange={onChangePassword}
              />
            </div>
            <div className="join-text">
              <h3>톡피넛이 처음이신가요?</h3>
              <JoinModal />
            </div>
            <LoginBtn variant="contained" fullWidth onClick={login}>
              로그인
            </LoginBtn>
          </PaddingWrap>
        </LoginBox>
      </LoginWrap>
    </ThemeProvider>
  );
};

const GlobalStyle = createGlobalStyle`
    body{
        background-color: #fff;
    }
`;

const LoginWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginBox = styled(Box)`
  background-color: #fff;
  border-radius: 10px;
  /* box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.05); */
  border: 0.5px solid #3b3b3b;
  margin-top: 8rem;
  h1 {
    font-size: 4rem;
    color: #ff7134;
    font-weight: bold;
    line-height: 150%;
    margin-bottom: 5rem;
    text-align: center;
  }
  .input-wrap {
    & > div {
      margin-bottom: 1rem;
    }
  }
  .join-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    h3 {
      font-size: 1.4rem;
      color: #3b3b3b;
      line-height: 150%;
    }
  }
  .social-login {
    button:first-of-type {
      margin: 2rem 0 1rem 0;
    }
  }
  @media ${() => theme.device.mobile} {
    margin-top: 0;
    border: none;
    height: 100%;
    width: 100%;
  }
`;

const PaddingWrap = styled(Box)`
  padding: 5rem 8rem;
  @media ${() => theme.device.mobile} {
    padding: 10rem 2rem 0 2rem;
  }
`;

const LoginBtn = styled(Button)`
  box-shadow: none;
  font-size: 1.8rem;
  color: #fff;
  padding: 1.2rem 2rem;
  margin: 2rem 0;
`;

const OutlinedBtn = styled(Button)`
  color: #3b3b3b;
  padding: 1.2rem 2rem;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  img {
    margin-right: 1rem;
  }
`;

const StyledTextField = styled(TextField)`
  input {
    font-size: 1.6rem;
    color: #3b3b3b;
    padding: 1.2rem 2rem;
  }
`;

export default Login;
