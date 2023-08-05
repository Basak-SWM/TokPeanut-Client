import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import qs from "qs";
import * as s from "./PaginationStyle";
import axios from "axios";
import dayjs from "dayjs";
import api from "../../../component/api";

import styled from "@emotion/styled";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import { Box, IconButton, Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import theme from "../../../style/theme";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Pagination = () => {
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

  const location = useLocation();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const presentation_id = query.presentation_id;
  const speech_id = query.speech_id;

  const [speechList, setSpeechList] = useState([]);
  const getSpeechList = async () => {
    try {
      const res = await api.get(`/presentations/${presentation_id}/speeches`);
      console.log("speech list response:", res);
      res.data.forEach((speech) => {
        const date = dayjs(speech.createdDate);
        // speech.createdDate = dayjs(speech.createdDate).diff(nowDate, "hour");
        speech.createdDate = dayjs().to(date);
      });
      setSpeechList(res.data);
    } catch (err) {
      console.log("speech list error:", err);
    }
  };

  useEffect(() => {
    getSpeechList();
  }, []);

  const navigate = useNavigate();

  const navigateToSpeech = (speech_id, index) => {
    // 녹음이 완료되지 않은 경우 연습 화면으로 이동
    if (!speechList[index].recordDone) {
      navigate(
        `/presentation/practice?presentation_id=${presentation_id}&speech_id=${speech_id}`
      );
    } else {
      navigate(
        `/presentation/speech?presentation_id=${presentation_id}&speech_id=${speech_id}`
      );
      window.location.reload();
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <PageBtnWrap>
          <ul>
            {speechList.map((speech, i) => (
              <li
                className={speech.id === speech_id * 1 ? "select" : ""}
                key={speech.id}
              >
                <Button onClick={() => navigateToSpeech(speech.id, i)}>
                  <div>Sp {i + 1}</div>
                  <div className="sub">{speech.createdDate}</div>
                </Button>
                <Checkbox
                  {...label}
                  icon={<StarBorderIcon />}
                  checkedIcon={<StarIcon />}
                  // checked={speech.stared}
                  onClick={(e) => e.stopPropagation()}
                />
              </li>
            ))}
          </ul>
        </PageBtnWrap>
      </ThemeProvider>
    </>
  );
};

const PageBtnWrap = styled(Box)`
  width: 10rem;
  /* border: 1px solid red; */
  position: sticky;
  top: 0;
  right: 3%;
  ul {
    max-height: 80vh;
    /* overflow-y: scroll; */
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: 13rem;
    .select {
      button {
        background-color: #ffeee0;
        color: #ff7134;
      }
    }
    li:last-of-type {
      border: none;
    }
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10rem;
      height: 10rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      position: relative;
      button {
        display: flex;
        flex-direction: column;
        /* align-items: flex-start; */
        /* padding-left: 1.5rem; */
        width: 100%;
        font-size: 2rem;
        color: #3b3b3b;
        height: 100%;
        box-shadow: none;
        border-radius: 0;
        .sub {
          font-size: 1.5rem;
          color: #a5a5a5;
        }
      }
      span {
        position: absolute;
        top: 0;
        right: 0;
        svg {
          width: 2rem;
          height: 2rem;
        }
      }
    }
  }

  @media ${() => theme.device.mobile} {
    width: 100%;
    position: static;
    margin-bottom: 3rem;
    ul {
      display: flex;
      align-items: center;
      overflow-y: scroll;
      margin-top: 10rem;
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
      li {
        border-bottom: none;
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        height: 6rem;
        width: 8rem;
        button {
          font-size: 2rem;
        }
        span {
          svg {
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      }
    }
    ul::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  }
`;

export default Pagination;
