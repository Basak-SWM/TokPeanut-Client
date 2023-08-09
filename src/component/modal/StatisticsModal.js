import React, { useCallback } from "react";
import Box from "@mui/material/Box";
import { createTheme, Dialog, ThemeProvider } from "@mui/material";
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import FilledBtn from "../button/FilledBtn";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../../style/theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CircleIcon from "@mui/icons-material/Circle";
import { ResponsiveLine } from "@nivo/line";

export default function StatisticsModal({
  presentaion_id,
  speech_id,
  statistics,
}) {
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

  const theme2 = useTheme();
  const fullScreen = useMediaQuery(theme2.breakpoints.down("md"));

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 분석이 완료된 경우만 통계 모달을 띄워줌 -> 여기서 분석 결과 받아오기
  // mock data
  const data = {
    pitch: [
      {
        id: "pitch",
        data: [
          { x: 0, y: 30 },
          { x: 1, y: 10 },
          { x: 2, y: 2 },
          { x: 3, y: 30 },
          { x: 4, y: 40 },
          { x: 5, y: 5 },
          { x: 6, y: 60 },
          { x: 7, y: 30 },
          { x: 8, y: 10 },
          { x: 9, y: 2 },
          { x: 10, y: 30 },
          { x: 11, y: 40 },
          { x: 12, y: 5 },
          { x: 13, y: 60 },
          { x: 14, y: 30 },
          { x: 15, y: 10 },
          { x: 16, y: 2 },
          { x: 17, y: 30 },
          { x: 18, y: 40 },
          { x: 19, y: 5 },
          { x: 20, y: 60 },
        ],
      },
    ],
    hz: statistics.hertz,
    // db: [],
    speed: statistics.lpm,
    pause: statistics.pause,
  };

  const PitchLine = useCallback(
    () => (
      <ResponsiveLine
        data={data.pitch}
        margin={{ top: 20, right: 20, bottom: 20, left: 25 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: 0,
          stacked: true,
          reverse: false,
        }}
        enableGridY={false}
        enableGridX={false}
        colors="#FF7134"
        pointSize={0}
        lineWidth={1}
      />
    ),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <FilledBtn text={"통계 보기"} handle={handleOpen} />
      <StatisticsModalWrap
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <ModalWrap>
          <div className="title">
            <h2>스피치 통계</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <ul className="statistcs-wrap">
            <li>
              <div className="sub-title">
                <CircleIcon />
                <h2>억양 변화</h2>
              </div>
              <p>
                억양의 변화가 많은 목소리는 더 영향력 있는 스피치를 만듭니다.
                <br /> 아래 그래프에서 억양 변화를 확인하세요.
              </p>
              <div className="graph-box">
                {/* <img src="/img/modal/sample.png" width="100%" /> */}
                <PitchLine />
              </div>
            </li>
            <li>
              <div className="sub-title">
                <CircleIcon />
                <h2>
                  음높이 : 평균 <span>{data.hz}</span> hz
                </h2>
              </div>
              <p>
                200Hz수준의 음높이를 유지하세요. <br />
                130Hz보다 낮거나, 400Hz보다 높은 경우 스크립트에 표시됩니다.
              </p>
            </li>
            <li>
              <div className="sub-title">
                <CircleIcon />
                <h2>소리의 크기 (dB)</h2>
              </div>
              <p>
                소리가 특별히 커지거나 작아지는 구간이 스크립트에 표시됩니다.
              </p>
            </li>
            <li>
              <div className="sub-title">
                <CircleIcon />
                <h2>
                  속도 : 평균 <span>{data.speed}</span> 음절/min
                </h2>
              </div>
              <p>
                속도를 350 음절/min 이하로 유지하세요. <br />
                목소리가 느릴수록 호감도, 매력성, 공신력이 올라가는 효과가
                있습니다.
              </p>
            </li>
            <li>
              <div className="sub-title">
                <CircleIcon />
                <h2>
                  휴지 : 평균 <span>{data.pause}</span> %
                </h2>
              </div>
              <p>
                말하기의 전달력을 높이려면 휴지 비율을 전체 20~25% 사이로
                유지하는 것이 좋습니다.
                <br /> 또한 느린 속도(300음절/min)의 경우 1.5초, 빠른
                속도(400음절/min(의 경우 0.4초가 적절한 문장간 휴지입니다.
              </p>
            </li>
          </ul>
        </ModalWrap>
      </StatisticsModalWrap>
    </ThemeProvider>
  );
}

const StatisticsModalWrap = styled(Dialog)`
  .MuiPaper-root {
    width: 80rem;
  }
  @media ${() => theme.device.mobile} {
    .MuiPaper-root {
      width: 100%;
    }
  }
`;

const ModalWrap = styled(Box)`
  padding: 4rem;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 2rem;
    border-bottom: 2px solid #ff7134;
    margin-bottom: 2rem;
    h2 {
      font-size: 2rem;
      color: #3b3b3b;
      font-weight: 600;
      line-height: 150%;
    }
    button {
      svg {
        width: 2rem;
        height: 2rem;
      }
    }
  }
  .statistcs-wrap {
    li {
      padding: 2rem;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 1rem;
      margin-bottom: 2rem;
      .sub-title {
        display: flex;
        align-items: center;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        svg {
          color: #ff7134;
          margin-right: 1rem;
        }
        h2 {
          font-size: 2rem;
          color: #3b3b3b;
          line-height: 150%;
          font-weight: 700;
          span {
            color: #ff7134;
          }
        }
      }
      p {
        font-size: 1.6rem;
        color: #3b3b3b;
        line-height: 150%;
        font-weight: 500;
        margin: 1rem 0;
      }
      .graph-box {
        width: 100%;
        height: 30rem;
        margin-top: 2rem;
      }
    }
    li:last-of-type {
      margin: 0;
    }
  }
`;
