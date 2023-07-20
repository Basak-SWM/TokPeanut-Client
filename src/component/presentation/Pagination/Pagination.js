import React from "react";
import { useNavigate } from "react-router-dom";
import * as s from "./PaginationStyle";

const Pagination = () => {
  const navigate = useNavigate();

  const navigateToSpeech = (e) => {
    const id = e.currentTarget.id;
    navigate(`/presentation/speech?speech_id=${id}`);
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
  ];

  return (
    <>
      <s.Container>
        {speechList.map((speech) => (
          <s.Speech id={speech.id} key={speech.id} onClick={navigateToSpeech}>
            <s.SpeechTitle>
              {speech.stared ? (
                <s.SpeechTitleStar>★</s.SpeechTitleStar>
              ) : (
                <s.SpeechTitleStar>☆</s.SpeechTitleStar>
              )}
              {speech.title}
            </s.SpeechTitle>
            <s.SpeechDate>{speech.date}</s.SpeechDate>
          </s.Speech>
        ))}
      </s.Container>
    </>
  );
};

export default Pagination;
