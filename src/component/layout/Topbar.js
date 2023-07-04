import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../image/Logo.png";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;

  &:hover,
  &:focus {
    font-weight: bold;
  }
`;

const Topbar = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100vw",
          borderBottom: "1px solid orange",
        }}
      >
        <img src={Logo} alt="TokPeanut Logo" style={{ height: "8vh" }} />

        <div
          style={{
            height: "8vh",
            width: "70vw",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <StyledLink to="/coach">코치</StyledLink>
          <StyledLink to="/user/mymatching">내 의뢰</StyledLink>
          <StyledLink to="/presentation">프레젠테이션</StyledLink>
          <StyledLink to="/login">로그인</StyledLink>
          <StyledLink to="/user/mypage">마이페이지</StyledLink>
        </div>
      </div>
    </>
  );
};

export default Topbar;
