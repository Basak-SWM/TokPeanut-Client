import React, { useState } from "react";
import Box from "@mui/material/Box";
import { createTheme, Dialog, ThemeProvider } from "@mui/material";
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import FilledBtn from "../button/FilledBtn";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import theme from "../../style/theme";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function AiFeedbackModal({ presentaion_id, speech_id }) {
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

  // mock data
  const [data, setData] = useState([
    {
      checkpoint: "초기 요구사항(프레젠테이션 생성 시 입력)",
      feedback: "첫번째 피드백",
    },
    {
      checkpoint: "두 번쩨 요구사항~ 전 이거이거를 잘 하고 싶어요~",
      feedback: "두 번째 피드백: 어쩌고저쩌고 이런걸 신경 써보세요",
    },
    {
      checkpoint:
        "세 번째 요구사항: 텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트",
      feedback:
        "세번째 피드백: 피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백",
    },
    {
      checkpoint: "네 번째 요구사항",
      feedback: "네번째 피드백",
    },
  ]);

  const newCheckPoint = (e) => {
    e.preventDefault();
    const newCheckPoint = {
      checkpoint: e.target[0].value,
      feedback: "새로운 피드백 입력 중...",
    };
    // console.log(e.target[0].value);
    data.push(newCheckPoint);
    setData([...data]);
  };

  return (
    <ThemeProvider theme={theme}>
      <FilledBtn text={"AI 피드백"} onClick={handleOpen} />
      <AiFeedbackModalWrap
        //    sx={style}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <ModalWrap>
          <div className="title">
            <h2>AI 논리 피드백</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="message-wrap">
            <div className="msg">
              {data.map((item, i) => (
                <div key={i}>
                  <div className="me-msg">
                    <h3>{item.checkpoint}</h3>
                  </div>
                  <div className="ai-msg">
                    <div className="profile">
                      <SmartToyIcon />
                    </div>
                    <h3>{item.feedback}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={newCheckPoint}>
            <div className="text-input">
              <div className="padding">
                <StyledTextField
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="새 요구사항 입력창"
                  multiline
                  maxRows={1}
                />
                <Button variant="contained" type="submit">
                  다시 입력
                </Button>
              </div>
            </div>
          </form>
        </ModalWrap>
      </AiFeedbackModalWrap>
    </ThemeProvider>
  );
}

const AiFeedbackModalWrap = styled(Dialog)`
  .MuiPaper-root {
    width: 60rem;
  }
  @media ${() => theme.device.mobile} {
    .MuiPaper-root {
      width: 100%;
    }
  }
`;

const ModalWrap = styled(Box)`
  overflow-y: hidden;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4rem 4rem 2rem 4rem;
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
  .message-wrap {
    background-color: #fafafa;
    padding: 4rem 0 3rem 0;
    max-height: 48rem;
    overflow-y: scroll;
    .msg {
      width: 100%;
      h3 {
        width: fit-content;
        max-width: 50rem;
        font-size: 1.6rem;
        color: #3b3b3b;
        line-height: 150%;
        font-weight: 600;
        padding: 1rem 2rem;
      }
      .me-msg {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        padding: 0 4rem 1rem 4rem;
        h3 {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          background-color: #ffeee0;
        }
      }
      .ai-msg {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 0 4rem 1rem 4rem;
        h3 {
          background-color: #fff;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-top-right-radius: 10px;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }
        svg {
          width: 3rem;
          height: 3rem;
          color: #ff7134;
          margin-right: 1rem;
        }
      }
    }
  }
  .text-input {
    background-color: #fff;
    box-shadow: 0 4px 5px 5px rgba(0, 0, 0, 0.05);
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;

    .padding {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2rem;
    }
    button {
      color: #fff;
      font-size: 1.6rem;
      box-shadow: none;
      width: 30%;
      padding: 1.1rem 2rem;
    }
  }
  @media ${() => theme.device.mobile} {
    .message-wrap {
      height: 80vh;
      max-height: 80vh;
    }
    .text-input {
      position: sticky;
      bottom: 0;
    }
  }
`;

const StyledTextField = styled(TextField)`
  width: 68%;
  textarea {
    font-size: 1.6rem;
    height: 1rem;
  }
`;
