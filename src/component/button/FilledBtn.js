import React, { useState } from "react";
import styled from "@emotion/styled";
import { createTheme, ThemeProvider } from "@mui/material";
import { Box, IconButton, Button } from "@mui/material";

export default function FilledBtn({ text, state, onClick, disabled }) {
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
        {state ? (
          <FilledButton variant="contained" disabled>
            {text}
          </FilledButton>
        ) : (
          <FilledButton
            variant="contained"
            onClick={onClick}
            disabled={disabled}
          >
            {text}
          </FilledButton>
        )}
      </ThemeProvider>
    </>
  );
}

const FilledButton = styled(Button)`
  background-color: #fff;
  color: #ff7134;
  font-size: 2rem;
  font-weight: 600;
  box-shadow: none;
  border-radius: 100px;
  padding: 1rem 5rem;
  border: 1px solid #ff7134;
  &:hover {
    background-color: #fff;
  }
`;
