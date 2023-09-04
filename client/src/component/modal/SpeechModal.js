import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, IconButton, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import theme from "../../style/theme";

const SpeechModal = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
  return (
    <>
      <ThemeProvider theme={theme2}>
        <SpeechModalWrap>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickOpen}
            fullWidth
          >
            스피치 의뢰
          </Button>
          <StyledDialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <Content>
              <div className="title">
                <h2>스피치 의뢰</h2>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>
              <StyledTextField
                id="filled-multiline-flexible"
                multiline
                maxRows={4}
                fullWidth
                placeholder="스피치를 의뢰할 대본을 입력하세요."
              />
              <SendBtn variant="outlined" fullWidth>
                스피치 의뢰
              </SendBtn>
            </Content>
          </StyledDialog>
        </SpeechModalWrap>
      </ThemeProvider>
    </>
  );
};

const SpeechModalWrap = styled(Box)`
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
      padding: 0.8rem 0.5rem;
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
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 2rem;
  textarea {
    font-size: 1.6rem;
    height: 30rem !important;
    line-height: 150%;
  }
`;
const SendBtn = styled(Button)`
  font-size: 1.6rem;
  padding: 0.5rem 2rem;
`;

export default SpeechModal;
