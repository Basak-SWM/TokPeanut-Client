
import React, { useState } from "react";
import styled from "@emotion/styled";
import Pagination from '@mui/material/Pagination';
import {createTheme,ThemeProvider} from '@mui/material';
import { Box, IconButton,Button } from "@mui/material";

export default function PaginationBox() {
    const theme = createTheme({
        typography:{
            fontFamily : "Pretendard"
        },
        palette: {
            primary: {
              main: "#FF7134",
            },
         },
    })
  return (
    <ThemeProvider theme={theme}>
        <PaginationWrap>
            <StyledPagination count={5} color="primary" />
        </PaginationWrap>
    </ThemeProvider>
  );
}

const PaginationWrap = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 5rem;
`;

const StyledPagination = styled(Pagination)`
    button{
        font-size: 1.4rem;
    }
    .Mui-selected{
        color: #fff !important;
    }
    svg{
        width: 2rem;
        height: 2rem;
    }
`;