import React from "react";
import { Link } from "react-router-dom";
import * as s from "./SummaryStyle";

const Summary = () => {
  return (
    <>
      <s.Container>
        <s.Pagination>
          (스피치 목록)
          <Link to="/presentation/speech?speech_id=1">Speech 1</Link>
          <Link to="/presentation/speech?speech_id=2">Speech 2</Link>
          <Link to="/presentation/speech?speech_id=2">Speech 3</Link>
          <Link to="/presentation/speech?speech_id=2">Speech 4</Link>
        </s.Pagination>
        <s.SummaryContainer>
          <s.SummaryWrapper>
            <s.SummaryText>교정 피드백 수</s.SummaryText>
            <s.Graph />
          </s.SummaryWrapper>
          <s.SummaryWrapper>
            <s.SummaryText>평균 속도</s.SummaryText>
            <s.Graph />
          </s.SummaryWrapper>
          <s.SummaryWrapper>
            <s.SummaryText>평균 휴지</s.SummaryText>
            <s.Graph />
          </s.SummaryWrapper>
          <s.SummaryWrapper>
            <s.SummaryText>평균 음높이</s.SummaryText>
            <s.Graph />
          </s.SummaryWrapper>
        </s.SummaryContainer>
      </s.Container>
    </>
  );
};

export default Summary;
