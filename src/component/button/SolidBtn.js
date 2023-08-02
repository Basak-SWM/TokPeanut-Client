import React, { useState } from "react";
import styled from "@emotion/styled";
import { createTheme, ThemeProvider } from "@mui/material";
import { Box, IconButton, Button } from "@mui/material";

export default function SolidBtn({ text, color, onClick }) {
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
  return (
    <>
      <ThemeProvider theme={theme}>
        {color == "white" ? (
          <SolidButton2 variant="outlined" onClick={onClick}>
            {text}
          </SolidButton2>
        ) : (
          <SolidButton variant="outlined" onClick={onClick}>
            {text}
          </SolidButton>
        )}
      </ThemeProvider>
    </>
  );
}

const SolidButton = styled(Button)`
  background-color: #fff;
  color: #ff7134;
  font-size: 2rem;
  font-weight: 600;
  box-shadow: none;
  border-radius: 100px;
  padding: 0.5rem 3rem;
  &:hover {
    background-color: #fff;
  }
`;

const SolidButton2 = styled(Button)`
  background-color: transparent;
  color: #fff;
  font-size: 2rem;
  font-weight: 600;
  box-shadow: none;
  border-radius: 100px;
  padding: 0.5rem 3rem;
  border-color: #fff;
  &:hover {
    border-color: #fff;
  }
`;
