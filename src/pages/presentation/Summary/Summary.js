import React from "react";
import { Link } from "react-router-dom";
import * as s from "./SummaryStyle";
import { ResponsiveLine } from "@nivo/line";

const Summary = () => {
  const MyResponsiveLine = ({ data, recommended, unit }) => (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      xFormat=" >-"
      yScale={{
        type: "linear",
        min: 0,
        max: recommended ? recommended[1] * 1.5 : "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2~f"
      // axisTop={null}
      // axisRight={null}
      // axisBottom={{
      //   orient: "bottom",
      //   tickSize: 5,
      //   tickPadding: 5,
      //   tickRotation: 0,
      //   legend: "스피치",
      //   legendOffset: 36,
      //   legendPosition: "middle",
      // }}
      axisLeft={null}
      enableGridY={false}
      isInteractive={false}
      colors={{ scheme: "nivo" }}
      pointSize={5}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      enablePointLabel={true}
      pointLabelYOffset={-16}
      // enableArea={recommended ? true : false}
      // areaBaselineValue={recommended}
      useMesh={true}
      legends={[]}
      markers={
        recommended
          ? [
              {
                axis: "y",
                value: recommended[0],
                lineStyle: {
                  stroke: "grey",
                  strokeWidth: recommended[0] > 0 ? 0.5 : 0,
                },
              },
              {
                axis: "y",
                value: recommended[1],
                lineStyle: { stroke: "grey", strokeWidth: 0.5 },
                legend: `권장 범위 (${recommended[0]} ~ ${recommended[1]}${unit})`,
                textStyle: {
                  fill: "grey",
                  fontSize: 10,
                },
              },
            ]
          : []
      }
      // layers 설정 안해주니까 마커 안보임
      layers={[
        "grid",
        "axes",
        "areas",
        "crosshair",
        "lines",
        "points",
        "slices",
        "mesh",
        "legends",
        "markers", // 마커를 제일 뒤에 둬서 위로 오도록
      ]}
    />
  );

  // mock data
  const feedback = [
    {
      id: "feedback",
      color: "hsl(279, 70%, 50%)",
      data: [
        {
          x: "speech 1",
          y: 27,
        },
        {
          x: "speech 2",
          y: 11,
        },
        {
          x: "speech 3",
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
          x: "speech 1",
          y: 420,
        },
        {
          x: "speech 2",
          y: 234,
        },
        {
          x: "speech 3",
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
          x: "speech 1",
          y: 27,
        },
        {
          x: "speech 2",
          y: 20,
        },
        {
          x: "speech 3",
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
          x: "speech 1",
          y: 440,
        },
        {
          x: "speech 2",
          y: 390,
        },
        {
          x: "speech 3",
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
              <MyResponsiveLine
                data={speed}
                recommended={[0, 350]}
                unit="음절/min"
              />
            </s.Graph>
          </s.SummaryWrapper>
          <s.SummaryWrapper>
            <s.SummaryText>평균 휴지</s.SummaryText>
            <s.Graph>
              <MyResponsiveLine data={pause} recommended={[0, 25]} unit="%" />
            </s.Graph>
          </s.SummaryWrapper>
          <s.SummaryWrapper>
            <s.SummaryText>평균 음높이</s.SummaryText>
            <s.Graph>
              <MyResponsiveLine data={hz} recommended={[200, 400]} unit="Hz" />
            </s.Graph>
          </s.SummaryWrapper>
        </s.SummaryContainer>
      </s.Container>
    </>
  );
};

export default Summary;
