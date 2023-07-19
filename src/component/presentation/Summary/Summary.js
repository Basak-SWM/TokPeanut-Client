import React from "react";
import { Link } from "react-router-dom";
import * as s from "./SummaryStyle";
import { ResponsiveLine } from "@nivo/line";

const Summary = () => {
  const MyResponsiveLine = ({ data, recommended }) => (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      // xScale={{ type: "linear" }}
      xFormat=" >-"
      yScale={{
        type: "linear",
        min: 0,
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2~f"
      // axisTop={null}
      // axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "스피치",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={null}
      enableGridY={false}
      colors={{ scheme: "nivo" }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      enablePointLabel={true}
      pointLabelYOffset={-16}
      enableArea={recommended ? true : false}
      areaBaselineValue={recommended}
      useMesh={true}
      legends={[]}
    />
  );

  // mock data
  const feedback = [
    {
      id: "feedback",
      color: "hsl(279, 70%, 50%)",
      data: [
        {
          x: 1,
          y: 27,
        },
        {
          x: 2,
          y: 11,
        },
        {
          x: 3,
          y: 15,
        },
      ],
    },
  ];
  const speed = [
    {
      id: "speed",
      color: "hsl(279, 70%, 50%)",
      data: [
        {
          x: 1,
          y: 420,
        },
        {
          x: 2,
          y: 234,
        },
        {
          x: 3,
          y: 302,
        },
      ],
    },
  ];
  const pause = [
    {
      id: "pause",
      color: "hsl(279, 70%, 50%)",
      data: [
        {
          x: 1,
          y: 27,
        },
        {
          x: 2,
          y: 20,
        },
        {
          x: 3,
          y: 15,
        },
      ],
    },
  ];
  const hz = [
    {
      id: "hz",
      color: "hsl(279, 70%, 50%)",
      data: [
        {
          x: 1,
          y: 420,
        },
        {
          x: 2,
          y: 390,
        },
        {
          x: 3,
          y: 300,
        },
      ],
    },
  ];
  return (
    <>
      <s.Container>
        <s.Pagination>
          (스피치 목록)
          <Link to="/presentation/speech?speech_id=1">Speech 1</Link>
          <Link to="/presentation/speech?speech_id=2">Speech 2</Link>
          <Link to="/presentation/speech?speech_id=3">Speech 3</Link>
        </s.Pagination>
        <s.SummaryContainer>
          <s.SummaryWrapper>
            <s.SummaryText>교정 피드백 수</s.SummaryText>
            <s.Graph>
              <MyResponsiveLine data={feedback} recommended={null} />
            </s.Graph>
          </s.SummaryWrapper>
          <s.SummaryWrapper>
            <s.SummaryText>평균 속도</s.SummaryText>
            <s.Graph>
              <MyResponsiveLine data={speed} recommended={350} />
            </s.Graph>
          </s.SummaryWrapper>
          <s.SummaryWrapper>
            <s.SummaryText>평균 휴지</s.SummaryText>
            <s.Graph>
              <MyResponsiveLine data={pause} recommended={25} />
            </s.Graph>
          </s.SummaryWrapper>
          <s.SummaryWrapper>
            <s.SummaryText>평균 음높이</s.SummaryText>
            <s.Graph>
              <MyResponsiveLine data={hz} recommended={300} />
            </s.Graph>
          </s.SummaryWrapper>
        </s.SummaryContainer>
      </s.Container>
    </>
  );
};

export default Summary;
