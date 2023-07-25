import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as s from "./PresentationListStyle";
import axios from "axios";

const PresentationList = () => {
  // 임시 계정
  const uuid = "63e11bdb-e4b6-4160-8fdf-b3cd94a0e4c9";
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

  const navigate = useNavigate();

  const navigateToPresentation = (e) => {
    const id = e.currentTarget.id;
    navigate(`/presentation/summary?presentation_id=${id}`);
  };

  return (
    <>
      <s.Container>
        <s.Title>프레젠테이션 목록</s.Title>
        {presentationList.map((p) => (
          <s.Presentation id={p.id} key={p.id} onClick={navigateToPresentation}>
            <s.PresentationTitle>{p.title}</s.PresentationTitle>
            <s.PresentationOutline>{p.outline}</s.PresentationOutline>
          </s.Presentation>
        ))}
        <Link to="/presentation/new">새 프레젠테이션</Link>
      </s.Container>
    </>
  );
};

export default PresentationList;
