import React, { useState, useCallback, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { Box, IconButton, Button, InputLabel } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../../style/theme";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import api from "../../api";
import AuthContext from "../../AuthContext";

const CoachingModal = ({ coachUuid }) => {
  const theme2 = createTheme({
    typography: {
      fontFamily: "Pretendard",
    },
    palette: {
      primary: {
        main: "#FF7134",
      },
      secondary: {
        main: "#D9D9D9",
      },
    },
  });

  const { authInfo } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // 프레젠테이션 선택 여부
  const [isPrSelected, setIsPrSelected] = useState(false);
  // 스피치 선택 여부
  const [isSpSelected, setIsSpSelected] = useState(false);
  const [selectedPresentation, setSelectedPresentation] = useState(0);
  const handleChangePresentation = (event) => {
    setSelectedPresentation(event.target.value);
    setIsPrSelected(true);
  };
  const [selectedSpeech, setSelectedSpeech] = useState(0);
  const handleChangeSpeech = (event) => {
    setSelectedSpeech(event.target.value);
    setIsSpSelected(true);
  };

  const [presentationList, setPresentationList] = useState([]);
  const getPresentationList = useCallback(async () => {
    try {
      const res = await api.get("/presentations");
      console.log("presentation list response:", res);
      setPresentationList(
        res.data.map((presentation) => ({
          id: presentation.id,
          title: presentation.title,
        }))
      );
      // console.log("presentation list response:", res);
    } catch (err) {
      console.log("🩸presentation list error:", err);
    }
  }, []);
  useEffect(() => {
    getPresentationList();
  }, [getPresentationList]);

  const [speechList, setSpeechList] = useState([]);
  const getSpeechList = useCallback(async () => {
    try {
      const res = await api.get(
        `/presentations/${selectedPresentation}/speeches`,
        {
          params: { "presentation-id": selectedPresentation },
        }
      );
      console.log("speech list response:", res);
      setSpeechList(res.data.map((speech) => speech.id));
    } catch (err) {
      console.log("🩸speech list error:", err);
    }
  }, [selectedPresentation]);
  useEffect(() => {
    getSpeechList();
  }, [getSpeechList]);

  // 코칭 의뢰 신청
  const requestCoaching = useCallback(async () => {
    try {
      const res = await api.post("/coaching-request", {
        speechId: selectedSpeech,
        coachUuid: coachUuid,
        userMessage: "",
      });
      console.log("request coaching response:", res);
      alert("코칭 의뢰가 완료되었습니다.");
    } catch (err) {
      console.log("🩸request coaching error:", err);
    }
  }, [selectedSpeech, coachUuid]);

  return (
    <>
      <ThemeProvider theme={theme2}>
        <CoachingModalWrap>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickOpen}
            fullWidth
            disabled={authInfo.type === "coach"}
          >
            코칭 의뢰
          </Button>
          <StyledDialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <Content>
              <div className="title">
                <h2>코칭 의뢰</h2>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>
              <ul>
                <li>
                  <h3>프레젠테이션 선택</h3>
                  <FormControl size="small" fullWidth focused={!isPrSelected}>
                    <StyledSelect
                      value={
                        selectedPresentation === 0 ? "" : selectedPresentation
                      }
                      onChange={handleChangePresentation}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {presentationList.map((p) => (
                        <StyledMenuItem
                          value={p.id === undefined ? "" : p.id}
                          key={p.id}
                        >
                          {p.title}
                        </StyledMenuItem>
                      ))}
                    </StyledSelect>
                  </FormControl>
                </li>
                <li>
                  <h3>스피치 선택</h3>
                  <FormControl size="small" fullWidth disabled={!isPrSelected}>
                    <StyledSelect
                      value={selectedSpeech === 0 ? "" : selectedSpeech}
                      onChange={handleChangeSpeech}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {speechList.map((s, i) => (
                        <StyledMenuItem
                          value={s === undefined ? "" : s}
                          key={s}
                        >
                          Speech {i + 1}
                        </StyledMenuItem>
                      ))}
                    </StyledSelect>
                  </FormControl>
                </li>
              </ul>
              <SendBtn
                variant="outlined"
                fullWidth
                onClick={requestCoaching}
                disabled={!isSpSelected}
              >
                코칭 의뢰
              </SendBtn>
            </Content>
          </StyledDialog>
        </CoachingModalWrap>
      </ThemeProvider>
    </>
  );
};

const CoachingModalWrap = styled(Box)`
  button {
    box-shadow: none;
    font-size: 1.6rem;
    padding: 0.8rem 2rem;
    color: #3b3b3b;
  }
  button:hover {
    background-color: #ff7134;
    border-color: #ff7134;
    color: #fff;
  }
  @media ${() => theme.device.mobile} {
    button {
      font-size: 1.2rem;
      padding: 0.8rem 1rem;
    }
  }
`;
const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    width: 60rem;
    max-width: 60rem;
  }
  @media ${() => theme.device.tablet} {
    .MuiPaper-root {
      width: 100%;
      max-width: 100%;
      border-radius: 0;
    }
  }
`;
const Content = styled(DialogContent)`
  padding: 4rem;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
    border-bottom: 2px solid #ff7134;
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
  ul {
    margin-bottom: 2rem;
    li {
      h3 {
        font-size: 1.6rem;
        color: #3b3b3b;
        margin-bottom: 1rem;
        line-height: 130%;
      }
    }
    li:first-of-type {
      margin-bottom: 2rem;
    }
  }
`;

const StyledSelect = styled(Select)`
  font-size: 1.4rem;
`;

const StyledMenuItem = styled(MenuItem)`
  font-size: 1.4rem;
`;

const SendBtn = styled(Button)`
  font-size: 1.6rem;
  padding: 0.5rem 2rem;
`;

export default CoachingModal;
