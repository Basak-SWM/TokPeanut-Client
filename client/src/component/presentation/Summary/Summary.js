import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as s from "./SummaryStyle";
import Pagination from "../Pagination/Pagination";
import { ResponsiveLine } from "@nivo/line";
import Nav from "../../layout/Nav";
import axios from "axios";
import qs from "qs";

import styled from "@emotion/styled";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import { Box, IconButton, Button } from "@mui/material";
import theme from "../../../style/theme";
import Checkbox from "@mui/material/Checkbox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import CircleIcon from "@mui/icons-material/Circle";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Summary = () => {
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

  const MyResponsiveLine = ({ data, recommended, unit }) => (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
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
      axisBottom={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 15,
        tickRotation: 0,
      }}
      enableGridY={false}
      enableGridX={false}
      isInteractive={true}
      // colors={{ scheme: "nivo" }}
      colors="#FF7134"
      lineWidth={1}
      pointSize={10}
      pointColor="#FF7134"
      pointBorderWidth={0}
      pointBorderColor={{ from: "serieColor" }}
      enablePointLabel={true}
      pointLabelYOffset={-16}
      // enableArea={recommended ? true : false}
      // areaBaselineValue={recommended}
      useMesh={true}
      crosshairType="x"
      legends={[]}
      markers={
        recommended
          ? [
              {
                axis: "y",
                value: recommended[1],
                lineStyle: { stroke: "grey", strokeWidth: 0 },
                legend: `권장 범위 (${recommended[0]} ~ ${recommended[1]}${unit})`,
                textStyle: {
                  fill: "grey",
                  fontSize: 12,
                },
              },
            ]
          : []
      }
      tooltip={({ point }) => {
        const { id, value, index, data } = point;
        return (
          <div
            style={{
              background: "white",
              padding: "8px",
              border: "1px solid #ccc",
              fontSize: "12px",
            }}
          >
            <div>
              {data.x} : {data.y} {unit}
            </div>
          </div>
        );
      }}
      layers={[
        // 권장 범위 위에도 호버할 수 있도록 맨 앞에 배치
        ({ xScale, yScale }) => {
          if (recommended && recommended.length === 2) {
            const [min, max] = recommended;
            const minY = yScale(min);
            const maxY = yScale(max);

            return (
              <rect
                x={0}
                y={maxY}
                width={xScale.range()[1] - xScale.range()[0]}
                height={minY - maxY}
                fill="#FF7134"
                fillOpacity={0.1}
              />
            );
          } else {
            return null;
          }
        },
        "grid",
        "axes",
        // "areas",
        "crosshair",
        "lines",
        "points",
        "slices",
        "mesh",
        "legends",
        "markers",
      ]}
    />
  );

  // mock data
  const feedback = [
    {
      id: "feedback",
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

  // 현재 프레젠테이션의 스피치 리스트 받아오기
  const location = useLocation();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const presentation_id = query.presentation_id;

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

  const navigateToSpeech = (i) => {
    navigate(
      `/presentation/speech?presentation_id=${presentation_id}&speech_id=${i}`
    );
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <Pagination /> */}
        <Nav />
        <Container>
          <div className="title">
            <h1>프레젠테이션 요약</h1>
          </div>
          <Content>
            {/* 페이지네이션 */}
            <div className="list-box">
              <h2>프레젠테이션 목록</h2>
              <ul className="prsentaition-list">
                {speechList.map((speech, i) => (
                  <li key={i}>
                    <OutlinedBtn
                      variant="outlined"
                      onClick={() => navigateToSpeech(speech.id)}
                    >
                      <Checkbox
                        {...label}
                        icon={<StarBorderIcon />}
                        checkedIcon={<StarIcon />}
                        checked
                      />
                      <div className="name">
                        <h3>Speech {i + 1}</h3>
                        <p>날짜 필요</p>
                      </div>
                    </OutlinedBtn>
                  </li>
                ))}
              </ul>
            </div>
            {/* 그래프 */}
            <div className="graph-box">
              <ul className="graph-wrap">
                <li>
                  <div className="sub-title">
                    <CircleIcon />
                    <h3>교정 피드백 수</h3>
                  </div>
                  <div className="graph">
                    <GraphBox>
                      <MyResponsiveLine
                        data={feedback}
                        recommended={null}
                        unit={"개"}
                      />
                    </GraphBox>
                  </div>
                </li>
                <li>
                  <div className="sub-title">
                    <CircleIcon />
                    <h3>평균속도</h3>
                  </div>
                  <div className="graph">
                    <GraphBox>
                      <MyResponsiveLine
                        data={speed}
                        recommended={[0, 350]}
                        unit="음절/min"
                      />
                    </GraphBox>
                  </div>
                </li>
                <li>
                  <div className="sub-title">
                    <CircleIcon />
                    <h3>평균 휴지</h3>
                  </div>
                  <div className="graph">
                    <GraphBox>
                      <MyResponsiveLine
                        data={pause}
                        recommended={[0, 25]}
                        unit="%"
                      />
                    </GraphBox>
                  </div>
                </li>
                <li>
                  <div className="sub-title">
                    <CircleIcon />
                    <h3>평균 음높이</h3>
                  </div>
                  <div className="graph">
                    <GraphBox>
                      <MyResponsiveLine
                        data={hz}
                        recommended={[200, 400]}
                        unit="Hz"
                      />
                    </GraphBox>
                  </div>
                </li>
              </ul>
            </div>
          </Content>
        </Container>
      </ThemeProvider>
    </>
  );
};

const Container = styled(Box)`
  width: 118rem;
  margin: 13rem auto 10rem auto;
  .title {
    padding-bottom: 1rem;
    border-bottom: 2px solid #ff7134;
    h1 {
      font-size: 2.5rem;
      color: #3b3b3b;
      font-weight: 700;
      line-height: 150%;
    }
  }
  @media ${() => theme.device.desktop} {
    width: 90%;
  }
  @media ${() => theme.device.tablet} {
  }
`;

const Content = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 3rem;
  .list-box {
    width: 24%;
    h2 {
      font-size: 1.8rem;
      color: #3b3b3b;
      line-height: 150%;
      margin-bottom: 2rem;
      font-weight: 500;
    }
    .prsentaition-list {
      li {
        margin-bottom: 1rem;
        .Mui-checked {
          color: #fce87e;
        }
      }
      li:last-of-type {
        margin: 0;
      }
    }
  }
  .graph-box {
    width: 74%;
    .graph-wrap {
      li {
        margin-bottom: 3rem;
        .sub-title {
          display: flex;
          align-items: center;
          svg {
            color: #ff7134;
            width: 2rem;
            height: 2rem;
            margin-right: 1rem;
          }
          h3 {
            font-size: 1.8rem;
            color: #3b3b3b;
            line-height: 150%;
            font-weight: 600;
          }
        }
        .graph {
          padding: 2rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 1rem;
          margin-top: 2rem;
        }
      }
      li:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  @media ${() => theme.device.tablet} {
    flex-direction: column;
    .list-box {
      width: 100%;
      height: 35rem;
      max-height: 35rem;
      overflow-y: scroll;
    }
    .graph-box {
      width: 100%;
      margin-top: 3rem;
    }
  }
`;

const OutlinedBtn = styled(Button)`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  svg {
    width: 3rem;
    height: 3rem;
  }
  .name {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 1rem;
    h3 {
      font-size: 2rem;
      font-weight: 600;
      line-height: 150%;
      color: #3b3b3b;
    }
    p {
      color: rgba(0, 0, 0, 0.6);
      font-size: 1.4rem;
      line-height: 150%;
      font-family: 400;
    }
  }
  &:hover {
    background-color: #fff;
  }
`;

const GraphBox = styled(Box)`
  position: relative;
  padding-bottom: 0;
  height: 40rem;
`;

export default Summary;
