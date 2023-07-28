import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import qs from "qs";
import * as s from "./PaginationStyle";
import axios from "axios";

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
  const speech_id = query.speech_id;
  console.log(speech_id);
  // 임시 프레젠테이션 id
  const presentation_id = 2;

  // const [speechList, setSpeechList] = useState([]);
  // const getSpeechList = async () => {
  //   let res = null;
  //   try {
  //     res = await axios.get(`/presentations/${presentation_id}/speeches`);
  //     console.log("speech list response:", res);
  //   } catch (err) {
  //     console.log("speech list error:", err);
  //   }
  //   setSpeechList(res.data);
  // };

  // useEffect(() => {
  //   getSpeechList();
  // }, []);

  const navigate = useNavigate();

  const navigateToSpeech = (i) => {
    // const id = e.currentTarget.id;
    navigate(`/presentation/speech?speech_id=${i}`);
  };
  // mock data
  const speechList = [
    {
      id: 1,
      title: "Speech 1",
      date: "2023-07-01",
      stared: false,
    },
    {
      id: 2,
      title: "Speech 2",
      date: "2023-06-01",
      stared: true,
    },
    {
      id: 3,
      title: "Speech 3",
      date: "2023-05-01",
      stared: false,
    },
    {
      id: 4,
      title: "Speech 3",
      date: "2023-05-01",
      stared: false,
    },
    {
      id: 5,
      title: "Speech 3",
      date: "2023-05-01",
      stared: false,
    },
    {
      id: 6,
      title: "Speech 3",
      date: "2023-05-01",
      stared: false,
    },
  ];

  return (
    <>
      <ThemeProvider theme={theme}>
        <PageBtnWrap>
          <ul>
            {speechList.map((speech) => (
              <li className={speech.id === speech_id * 1 ? "select" : ""}>
                <Button onClick={() => navigateToSpeech(speech.id)}>
                  {speech.id}
                </Button>
                <Checkbox
                  {...label}
                  icon={<StarBorderIcon />}
                  checkedIcon={<StarIcon />}
                  checked={speech.stared}
                />
              </li>
            ))}
          </ul>
        </PageBtnWrap>
      </ThemeProvider>
      {/* <s.Container>
        {speechList.map((speech, i) => (
          <s.Speech id={speech.id} key={speech.id} onClick={navigateToSpeech}>
            <s.SpeechTitle>
              {speech.stared ? (
                <s.SpeechTitleStar>★</s.SpeechTitleStar>
              ) : (
                <s.SpeechTitleStar>☆</s.SpeechTitleStar>
              )} */}
      {/* 실제 스피치 id와 사용자에게 보여주는 스피치 번호는 다름 */}
      {/* 스피치 {i + 1}
            </s.SpeechTitle>
            <s.SpeechDate>{speech.date}</s.SpeechDate>
          </s.Speech>
        ))}
      </s.Container> */}
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
        width: 100%;
        font-size: 2.5rem;
        color: #3b3b3b;
        height: 100%;
        box-shadow: none;
        border-radius: 0;
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
