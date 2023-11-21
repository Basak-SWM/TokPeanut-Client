import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import { Box, IconButton, Button } from "@mui/material";
import theme from "../../style/theme";
import AuthContext from "../../AuthContext";
import api from "../../api";

import MenuIcon from "@mui/icons-material/Menu";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Link from "@mui/material/Link";
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
                  <a href="/">
                    <img src="/img/tokpeanut.png" alt="logo" />
                  </a>
                </div>
                <ul>
                  <li>
                    <a href="/coach">코치</a>
                  </li>
                  <li>
                    <a
                      href={
                        authInfo.type === "user"
                          ? "/user/mymatching"
                          : "/user/coachmatching"
                      }
                    >
                      내 의뢰
                    </a>
                  </li>
                  {authInfo.type === "user" && (
                    <li>
                      <a href="/presentation">프레젠테이션</a>
                    </li>
                  )}
                </ul>
              </div>
              <div className="right-box">
                <ul>
                  <li>
                    {authInfo.type === "user" ? (
                      <RBtn onClick={logout}>
                        {authInfo.nickname} 님 | 로그아웃
                      </RBtn>
                    ) : authInfo.type === "coach" ? (
                      <RBtn onClick={logout}>
                        {authInfo.nickname} 코치 | 로그아웃
                      </RBtn>
                    ) : (
                      <a href="/login">로그인</a>
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
                    <a href="/">
                      <img src="/img/tokpeanut.png" alt="logo" />
                    </a>
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
                            `${authInfo.nickname} 님 | 로그아웃`
                          ) : authInfo.type === "coach" ? (
                            `${authInfo.nickname} 코치 | 로그아웃`
                          ) : (
                            <a href="/login">로그인</a>
                          )}
                          <span>|</span>
                          <a href="/user/mypage">마이페이지</a>
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
                    <StyledLink href="/presentation" underline="none">
                      <ListItemButton sx={{ p: 1 }}>
                        <StyledListItemText primary="프레젠테이션" />
                      </ListItemButton>
                    </StyledLink>
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
    }
    ul {
      display: flex;
      align-items: center;
      li {
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

export default Nav;
