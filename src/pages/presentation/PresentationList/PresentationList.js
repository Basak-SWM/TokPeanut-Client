import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import * as s from "./PresentationListStyle";
import axios from "axios";
import styled from "@emotion/styled";
import { createGlobalStyle } from "styled-components";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import { Box, IconButton, Button } from "@mui/material";
import Nav from "../../layout/Nav";
import theme from "../../../style/theme";
import FilledBtn from "../../button/FilledBtn";
import SolidBtn from "../../button/SolidBtn";

// import PaginationBox from "../../component/pagination/Pagination";

const PresentationList = () => {
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
  // 임시 계정
  const uuid = "b646969a-c87d-482f-82c5-6ec89c917412";
  const [presentationList, setPresentationList] = useState([]);
  const getPresentationList = async () => {
    let res = null;
    try {
      res = await axios.get("/presentations", {
        params: { "account-uuid": uuid },
      });
      console.log("presentation list response:", res);
    } catch (err) {
      console.log("presentation list error:", err);
    }
    setPresentationList(res.data);
  };

  useEffect(() => {
    getPresentationList();
  }, []);

  // const navigate = useNavigate();

  // const navigateToPresentation = (e) => {
  //   const id = e.currentTarget.id;
  //   navigate(`/presentation/summary?presentation_id=${id}`);
  // };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Nav />
        <Banner>
          <Container>
            <div className="text-wrap">
              <h4>presentation list</h4>
              <h1>모든 발표 준비를 한 번에</h1>
              <p>여러 번 연습하고 피드백을 받으며 말하기 실력을 키워요.</p>
            </div>
          </Container>
        </Banner>
        <Container>
          <ListWrap>
            <div className="new-btn">
              <Link to="/presentation/new">
                <SolidBtn text={"새 프레젠테이션"}></SolidBtn>
              </Link>
            </div>
            <ul className="list-wrap">
              {presentationList.map((p) => (
                <li>
                  <Link to={`/presentation/summary?presentation_id=${p.id}`}>
                    <ListBox variant="outlined">
                      <div className="name">
                        <h3>{p.outline}</h3>
                        <h2>{p.title}</h2>
                      </div>
                      <span>날짜</span>
                    </ListBox>
                  </Link>
                </li>
              ))}
            </ul>
          </ListWrap>
        </Container>
      </ThemeProvider>
    </>
  );
};

const Container = styled(Box)`
  width: 118rem;
  margin: 0 auto;
  @media ${() => theme.device.desktop} {
    width: 90%;
  }
`;

const Banner = styled(Box)`
  width: 100%;
  height: 30rem;
  margin-top: 8rem;
  background-color: #fff8f3;
  background-image: url(../img/banner.png);
  background-position: center;
  background-size: cover;
  .text-wrap {
    height: 30rem;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    h4 {
      font-size: 1.4rem;
      color: #ff7134;
      font-weight: bold;
      line-height: 150%;
    }
    h1 {
      font-size: 3rem;
      color: #3b3b3b;
      line-height: 150%;
      font-weight: bold;
    }
    p {
      font-size: 1.6rem;
      color: #3b3b3b;
      line-height: 150%;
      margin-top: 1rem;
    }
  }
  @media ${() => theme.device.tablet} {
    margin-top: 6rem;
  }
  @media ${() => theme.device.mobile} {
    .text-wrap {
      h1 {
        font-size: 2.5rem;
      }
    }
  }
`;

const ListWrap = styled(Box)`
  padding-bottom: 10rem;
  .new-btn {
    button {
      margin-top: 5rem;
      font-size: 1.6rem;
    }
  }
  .list-wrap {
    margin-top: 3rem;
    li {
      margin-bottom: 1rem;
    }
    li:last-of-type {
      margin: 0;
    }
  }
  @media ${() => theme.device.mobile} {
    padding-bottom: 5rem;
  }
`;

const ListBox = styled(Button)`
  border-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem;
  &:hover {
    background-color: #ff7134;
    .name {
      h3 {
        color: #fff;
      }
      h2 {
        color: #fff;
      }
    }
    span {
      color: #fff;
    }
  }
  .name {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h3 {
      font-size: 1.6rem;
      color: #3b3b3b;
      line-height: 150%;
      font-weight: 400;
    }
    h2 {
      font-size: 2.5rem;
      color: #3b3b3b;
      line-height: 150%;
      font-weight: bold;
    }
  }
  span {
    font-size: 1.6rem;
    color: rgba(0, 0, 0, 0.6);
    line-height: 150%;
    font-weight: 400;
  }
  @media ${() => theme.device.mobile} {
    padding: 3rem;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .name {
      h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
    }
  }
`;

export default PresentationList;
