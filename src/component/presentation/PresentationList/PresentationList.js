import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as s from "./PresentationListStyle";

const PresentationList = () => {
  const navigate = useNavigate();

  const navigateToPresentation = (e) => {
    const id = e.currentTarget.id;
    navigate(`/presentation/summary?presentation_id=${id}`);
  };

  // mock data
  const presentationList = [
    {
      id: 1,
      title: "Presentation 1",
      date: "2023-07-01",
    },
    {
      id: 2,
      title: "Presentation 2",
      date: "2023-06-01",
    },
    {
      id: 3,
      title: "Presentation 3",
      date: "2023-05-01",
    },
  ];

  return (
    <>
      <s.Container id={4}>
        <s.Title>프레젠테이션 목록</s.Title>
        {presentationList.map((p) => (
          <s.Presentation id={p.id} key={p.id} onClick={navigateToPresentation}>
            <s.PresentationTitle>{p.title}</s.PresentationTitle>
            <s.PresentationDate>{p.date}</s.PresentationDate>
          </s.Presentation>
        ))}
        <Link to="/presentation/new">새 프레젠테이션</Link>
      </s.Container>
    </>
  );
};

export default PresentationList;
