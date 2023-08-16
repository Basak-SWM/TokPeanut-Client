import React, { useState } from "react";
import styled from "@emotion/styled";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import { Box, IconButton, Button } from "@mui/material";
import theme from "../../style/theme";

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

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavWrap>
          <PC>
            <div className="nav-wrap">
              <div className="left-box">
                <div className="logo">
                  <a href="/">
                    {/* 임시 로고 */}
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "25px",
                        textAlign: "center",
                        color: "#ff7134",
                      }}
                    >
                      TOKPEANUT
                    </div>
                  </a>
                </div>
                <ul>
                  <li>
                    <a href="/coach">코치</a>
                  </li>
                  <li>
                    <a href="/user/mymatching">내 의뢰</a>
                  </li>
                  <li>
                    <a href="/presentation">프레젠테이션</a>
                  </li>
                </ul>
              </div>
              <div className="right-box">
                <ul>
                  <li>
                    <a href="/login">로그인</a>
                  </li>
                  <li>
                    <RBtn variant="outlined">마이페이지</RBtn>
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
                      <div
                        style={{
                          fontWeight: "bolder",
                          fontSize: "25px",
                          textAlign: "center",
                          color: "#ff7134",
                        }}
                      >
                        TOKPEANUT
                      </div>
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
                          <a href="/login">로그인</a>
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
                    <StyledLink href="/user/mymatching" underline="none">
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
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 1000;
  .dp-flex {
    display: flex;
    align-items: center;
  }
  .nav-wrap {
    padding: 1.3rem 3%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left-box {
      display: flex;
      align-items: center;
    }
    ul {
      display: flex;
      align-items: center;
      li {
        margin-left: 5rem;
        a {
          font-size: 1.6rem;
          color: #3b3b3b;
          font-weight: 500;
        }
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
      .logo {
        img {
          width: 80%;
        }
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

// import React from "react";
// import { Link } from "react-router-dom";
// // import Logo from "../../image/Logo.png";
// import styled from "styled-components";

// const StyledLink = styled(Link)`
//   color: black;
//   text-decoration: none;

//   &:hover,
//   &:focus {
//     font-weight: bold;
//   }
// `;

// const Topbar = () => {
//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           width: "100vw",
//           borderBottom: "1px solid orange",
//           height: "8vh",
//         }}
//       >
//         <StyledLink to="/">
//           {/* <img src={Logo} alt="TokPeanut Logo" style={{ height: "8vh" }} /> */}
//           <div
//             style={{
//               fontWeight: "bold",
//               width: "15vw",
//               lineHeight: "8vh",
//               fontSize: "30px",
//               textAlign: "center",
//               color: "#F38025",
//             }}
//           >
//             TokPeanut
//           </div>
//         </StyledLink>

//         <div
//           style={{
//             height: "8vh",
//             width: "70vw",
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-around",
//           }}
//         >
//           <StyledLink to="/coach">코치</StyledLink>
//           <StyledLink to="/user/mymatching">내 의뢰</StyledLink>
//           <StyledLink to="/presentation">프레젠테이션</StyledLink>
//           <StyledLink to="/login">로그인</StyledLink>
//           <StyledLink to="/user/mypage">마이페이지</StyledLink>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Topbar;