import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "@emotion/styled";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import { Box, IconButton, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import theme from "../../style/theme";
import AuthContext from "../../AuthContext";
import api from "../../api";

import MenuIcon from "@mui/icons-material/Menu";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
const Nav = () => {
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

  const { authInfo, setAuthInfo } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const logout = async () => {
    const logoutChk = window.confirm("로그아웃 하시겠습니까?");
    if (!logoutChk) return;
    try {
      const res = await api.patch("/accounts/logout");
      // console.log("logout res: ", res);
      setAuthInfo({ nickname: "", type: "" });
      alert("로그아웃 되었습니다.");
      navigate("/login");
    } catch (err) {
      console.log("logout err: ", err);
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavWrap>
          <PC>
            <div className="nav-wrap">
              <div className="left-box">
                <div className="logo">
                  <Link to="/">
                    <img src="/img/tokpeanut.png" alt="logo" />
                  </Link>
                </div>
                <ul>
                  <li>
                    <Link to="/coach">코치</Link>
                  </li>
                  <li>
                    <Link
                      to={
                        authInfo.type === "user"
                          ? "/user/mymatching"
                          : "/user/coachmatching"
                      }
                    >
                      내 의뢰
                    </Link>
                  </li>
                  {authInfo.type === "user" && (
                    <li>
                      <Link to="/presentation">프레젠테이션</Link>
                    </li>
                  )}
                </ul>
              </div>
              <div className="right-box">
                <ul>
                  <li>
                    {authInfo.type === "user" ? (
                      <>
                        <AccountCircleIcon
                          sx={{ color: "#FF7134" }}
                          fontSize="large"
                        />
                        &nbsp;&nbsp;
                        <span className="nickname">{authInfo.nickname} 님</span>
                        <LgBtn onClick={logout}>로그아웃</LgBtn>
                      </>
                    ) : authInfo.type === "coach" ? (
                      <>
                        <AccountCircleIcon
                          sx={{ color: "#FF7134" }}
                          fontSize="large"
                        />
                        &nbsp;&nbsp;
                        <span className="nickname">
                          {authInfo.nickname} 코치
                        </span>
                        <LgBtn onClick={logout}>로그아웃</LgBtn>
                      </>
                    ) : (
                      <Link to="/login">로그인</Link>
                    )}
                  </li>
                  <li>
                    <RBtn
                      variant="outlined"
                      onClick={() => navigate("/user/mypage")}
                    >
                      마이페이지
                    </RBtn>
                  </li>
                </ul>
              </div>
            </div>
          </PC>
          <Mobile>
            <div className="nav-wrap">
              <StyledList
                sx={{ width: "100%", bgcolor: "background.paper" }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <div className="dp-flex mobileNav">
                  <div className="logo">
                    <Link to="/">
                      <img src="/img/tokpeanut.png" alt="logo" />
                    </Link>
                  </div>
                  <MenuBtn onClick={handleClick}>
                    <MenuIcon />
                  </MenuBtn>
                </div>
                <StyledCollapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ mt: 2 }}>
                    <StyledLink href="" underline="none">
                      <ListItemButton sx={{ p: 1 }}>
                        <div className="dp-flex login-wrap">
                          {authInfo.type === "user" ? (
                            <>
                              <AccountCircleIcon
                                sx={{ color: "#FF7134" }}
                                fontSize="large"
                              />
                              &nbsp;&nbsp;
                              <span className="nickname">
                                {authInfo.nickname} 님
                              </span>
                              <LgBtn onClick={logout}>로그아웃</LgBtn>
                            </>
                          ) : authInfo.type === "coach" ? (
                            <>
                              <AccountCircleIcon
                                sx={{ color: "#FF7134" }}
                                fontSize="large"
                              />
                              &nbsp;&nbsp;
                              <span className="nickname">
                                {authInfo.nickname} 코치
                              </span>
                              <LgBtn onClick={logout}>로그아웃</LgBtn>
                            </>
                          ) : (
                            <Link to="/login">로그인</Link>
                          )}
                          <span>|</span>
                          <Link to="/user/mypage">마이페이지</Link>
                        </div>
                      </ListItemButton>
                    </StyledLink>
                    <StyledLink href="/coach" underline="none">
                      <ListItemButton sx={{ p: 1 }}>
                        <StyledListItemText primary="코치" />
                      </ListItemButton>
                    </StyledLink>
                    <StyledLink
                      href={
                        authInfo.type === "user"
                          ? "/user/mymatching"
                          : "/user/coachmatching"
                      }
                      underline="none"
                    >
                      <ListItemButton sx={{ p: 1 }}>
                        <StyledListItemText primary="내 의뢰" />
                      </ListItemButton>
                    </StyledLink>
                    {authInfo.type === "user" && (
                      <StyledLink href="/presentation" underline="none">
                        <ListItemButton sx={{ p: 1 }}>
                          <StyledListItemText primary="프레젠테이션" />
                        </ListItemButton>
                      </StyledLink>
                    )}
                  </List>
                </StyledCollapse>
              </StyledList>
            </div>
          </Mobile>
        </NavWrap>
      </ThemeProvider>
    </>
  );
};

const PC = styled(Box)`
  @media ${() => theme.device.mobile} {
    display: none;
  }
`;
const Mobile = styled(Box)`
  display: none;
  @media ${() => theme.device.mobile} {
    display: block;
  }
`;

const NavWrap = styled(Box)`
  background-color: #fff;
  width: 90%;
  padding: 0 5%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 1000;
  .dp-flex {
    display: flex;
    align-items: center;
  }
  .nav-wrap {
    padding: 1.3rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left-box {
      display: flex;
      align-items: center;
    }
    .right-box {
      margin-right: 2rem;
      .nickname {
        font-size: 1.6rem;
        color: #3b3b3b;
        font-weight: 570;
        margin-right: 1rem;
      }
    }
    ul {
      display: flex;
      align-items: center;
      li {
        display: flex;
        align-items: center;
        margin-left: 7rem;
        a {
          font-size: 1.6rem;
          color: #3b3b3b;
          font-weight: 570;
        }
        &:hover {
          a {
            color: #ff7134;
            transition: all 0.3s;
            font-weight: 700;
          }
        }
      }
    }
  }
  .logo {
    img {
      width: 3rem;
      padding: 0 0.25rem;
    }
    &:hover {
      img {
        width: 3.5rem;
        padding: 0;
        transition: all 0.3s ease-in-out;
      }
    }
  }
  @media ${() => theme.device.mobile} {
    .nav-wrap {
      padding: 0.5rem 2% 0.5rem 3%;
    }
  }
`;

const StyledList = styled(List)`
  position: relative;
  .css-16ac5r2-MuiButtonBase-root-MuiListItemButton-root {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
  }
  .mobileNav {
    align-items: center;
    justify-content: space-between;
  }
  @media ${() => theme.device.mobile} {
    .mobileNav {
      button:last-of-type {
        padding: 0 1rem;
        min-width: auto;
      }
    }
  }
`;

const MenuBtn = styled(Button)`
  min-width: max-content;
  color: #3b3b3b;
  border-radius: 100px;
  svg {
    width: 3rem;
    height: 3rem;
  }
  &:hover {
    background-color: #fff;
  }
`;

const StyledListItemText = styled(ListItemText)`
  span {
    font-size: 1.4rem;
    color: #3b3b3b;
    line-height: 130%;
    padding: 0 2%;
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  .login-wrap {
    padding: 0.6rem 2%;
    a {
      font-size: 1.4rem;
      color: #3b3b3b;
      font-weight: 700;
    }
    span {
      font-size: 1.4rem;
      color: rgba(0, 0, 0, 0.6);
      margin: 0 1rem;
    }
  }
`;

const StyledCollapse = styled(Collapse)`
  position: fixed;
  top: 6rem;
  left: 0;
  background-color: #fff;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const RBtn = styled(Button)`
  border-radius: 100px;
  font-size: 1.6rem;
  @media ${() => theme.device.mobile} {
    font-size: 1.4rem;
  }
`;

const LgBtn = styled(Button)`
  color: gray;
  text-decoration: underline;
  font-size: 1.6rem;
  @media ${() => theme.device.mobile} {
    font-size: 1.4rem;
  }
  &:hover {
    text-decoration: underline;
    font-weight: 700;
    background-color: #fff;
  }
`;

export default Nav;
