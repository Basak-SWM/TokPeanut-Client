import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, IconButton, Button } from "@mui/material";
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

const CoachingModal = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [select, setSelect] = React.useState("10");

  const handleChange = (event) => {
    setSelect(event.target.value);
  };
  const [select2, setSelect2] = React.useState("10");

  const handleChange2 = (event) => {
    setSelect2(event.target.value);
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
        <CoachingModalWrap>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickOpen}
            fullWidth
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
                  <FormControl size="small" fullWidth>
                    <StyledSelect
                      value={select}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <StyledMenuItem value={10}>선택</StyledMenuItem>
                      <StyledMenuItem value={20}>선택</StyledMenuItem>
                      <StyledMenuItem value={30}>선택</StyledMenuItem>
                    </StyledSelect>
                  </FormControl>
                </li>
                <li>
                  <h3>스피치 선택</h3>
                  <FormControl size="small" fullWidth>
                    <StyledSelect
                      value={select2}
                      onChange={handleChange2}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <StyledMenuItem value={10}>선택</StyledMenuItem>
                      <StyledMenuItem value={20}>선택</StyledMenuItem>
                      <StyledMenuItem value={30}>선택</StyledMenuItem>
                    </StyledSelect>
                  </FormControl>
                </li>
              </ul>
              <SendBtn variant="outlined" fullWidth>
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
