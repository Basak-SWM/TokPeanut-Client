import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "./PaginationStyle";
import axios from "axios";

const Pagination = () => {
  // 임시 프레젠테이션 id
  const presentation_id = 2;

  const [speechList, setSpeechList] = useState([]);
  const getSpeechList = async () => {
    let res = null;
    try {
      res = await axios.get(`/presentations/${presentation_id}/speeches`);
      console.log("speech list response:", res);
    } catch (err) {
      console.log("speech list error:", err);
    }
    setSpeechList(res.data);
  };

  useEffect(() => {
    getSpeechList();
  }, []);

  const navigate = useNavigate();

  const navigateToSpeech = (e) => {
    const id = e.currentTarget.id;
    navigate(`/presentation/speech?speech_id=${id}`);
  };
  // mock data
  // const speechList = [
  //   {
  //     id: 1,
  //     title: "Speech 1",
  //     date: "2023-07-01",
  //     stared: false,
  //   },
  //   {
  //     id: 2,
  //     title: "Speech 2",
  //     date: "2023-06-01",
  //     stared: true,
  //   },
  //   {
  //     id: 3,
  //     title: "Speech 3",
  //     date: "2023-05-01",
  //     stared: false,
  //   },
  // ];

  return (
    <>
      <s.Container>
        {speechList.map((speech, i) => (
          <s.Speech id={speech.id} key={speech.id} onClick={navigateToSpeech}>
            <s.SpeechTitle>
              {speech.stared ? (
                <s.SpeechTitleStar>★</s.SpeechTitleStar>
              ) : (
                <s.SpeechTitleStar>☆</s.SpeechTitleStar>
              )}
              {/* 실제 스피치 id와 사용자에게 보여주는 스피치 번호는 다름 */}
              스피치 {i + 1}
            </s.SpeechTitle>
            <s.SpeechDate>{speech.date}</s.SpeechDate>
          </s.Speech>
        ))}
      </s.Container>
    </>
  );
};

export default Pagination;
