import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import * as s from "./PresentationListStyle";
import axios from "axios";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import { createGlobalStyle } from "styled-components";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import {
  Box,
  IconButton,
  Button,
  FormControlLabel,
  Switch,
  Slide,
} from "@mui/material";
import Nav from "../../layout/Nav";
import theme from "../../../style/theme";
import FilledBtn from "../../button/FilledBtn";
import SolidBtn from "../../button/SolidBtn";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import api from "../../api";

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
    try {
      const res = await api.get("/presentations", {
        params: { "account-uuid": uuid },
      });
      const nowDate = new Date();
      res.data.forEach((presentation) => {
        const date = dayjs(presentation.createdDate);
        presentation.createdDate = dayjs().to(date);
      });
      setPresentationList(res.data);
      console.log("presentation list response:", res);
    } catch (err) {
      console.log("presentation list error:", err);
    }
  };

  useEffect(() => {
    getPresentationList();
  }, []);

  const navigate = useNavigate();

  const navigateToPresentation = (presentation_id) => {
    if (editMode) return;
    navigate(`/presentation/summary?presentation_id=${presentation_id}`);
  };

  const [editMode, setEditMode] = useState(false);
  const handleDelete = async (e, presentation_id) => {
    e.stopPropagation();
    if (window.confirm("해당 프레젠테이션을 삭제하시겠습니까?")) {
      try {
        const res = await api.delete(`/presentations/${presentation_id}`, {
          params: {
            "presentation-id": presentation_id,
          },
        });
        console.log("delete presentation response:", res);
        alert("삭제되었습니다.");
        getPresentationList();
      } catch (err) {
        console.log("delete presentation error:", err);
      }
    } else {
      alert("삭제가 취소되었습니다.");
    }
  };

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
            <Guide>
              <div className="new-btn">
                <Link to="/presentation/new">
                  <SolidBtn text={"새 프레젠테이션"}></SolidBtn>
                </Link>
              </div>
              {/* <span id="edit" onClick={() => setEditMode(!editMode)}>
                {editMode ? "완료" : "편집"}
              </span> */}
              <FormControlLabel
                label="편집 모드"
                control={
                  <Switch
                    checked={editMode}
                    onChange={() => setEditMode(!editMode)}
                  />
                }
              />
            </Guide>
            <ul className="list-wrap">
              {presentationList
                .map((p) => (
                  <li key={p.id}>
                    <ListBox
                      variant="outlined"
                      onClick={() => navigateToPresentation(p.id)}
                    >
                      <div className="name">
                        <h3>{p.outline}</h3>
                        <h2>{p.title}</h2>
                      </div>
                      <span>
                        {p.createdDate}
                        {/* {editMode && (
                        <DeleteOutlinedIcon
                          onClick={(e) => handleDelete(e, p.id)}
                          className="delete"
                          fontSize="small"
                        />
                      )} */}
                        <Slide
                          direction="left"
                          in={editMode}
                          mountOnEnter
                          unmountOnExit
                        >
                          {
                            <div className="delete_container">
                              <DeleteOutlinedIcon
                                onClick={(e) => handleDelete(e, p.id)}
                                className="delete"
                                fontSize="small"
                              />
                            </div>
                          }
                        </Slide>
                      </span>
                    </ListBox>
                  </li>
                ))
                .reverse()}
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
  margin-top: 5rem;
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
  #edit {
    cursor: pointer;
    font-size: 1.5rem;
    color: gray;
    margin-top: 5rem;
    margin-right: 0.7rem;
    font-weight: 500;
    &:hover {
      color: #ff7134;
      text-decoration: underline;
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
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    color: rgba(0, 0, 0, 0.6);
    line-height: 150%;
    font-weight: 400;
    .delete {
      cursor: pointer;
      height: 2.5rem;
      width: 2.5rem;
      margin-left: 2rem;
    }
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

const Guide = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default PresentationList;
