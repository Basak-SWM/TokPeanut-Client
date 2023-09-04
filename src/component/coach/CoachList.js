import React, { useState } from "react";
import styled from "@emotion/styled";
import { createTheme, Divider, Icon, ThemeProvider } from "@mui/material";
import { Box, IconButton, Button, Grid } from "@mui/material";
import Nav from "../layout/Nav";
import theme from "../../style/theme";
import TextField from "@mui/material/TextField";
// import PaginationBox from "../../component/pagination/Pagination";
import SearchIcon from "@mui/icons-material/Search";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CoachCard from "./card/CoachCard";

import Pagination from "@mui/material/Pagination";

const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const CoachList = () => {
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

  const [select, setSelect] = React.useState("10");

  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Nav />
        <Banner>
          <Container>
            <div className="text-wrap">
              <h4>coach list</h4>
              <h1>코치 리스트</h1>
              <p>
                모든 발표 준비를 한 번에
                <br />
                여러 번 연습하고 피드백을 받으며 말하기 실력을 키워요.
              </p>
            </div>
          </Container>
        </Banner>
        <Container>
          <SearchBar>
            <StyledTextField
              id="search"
              variant="outlined"
              type="text"
              placeholder="검색어를 입력하세요"
              fullWidth
            />
            <Button variant="contained">
              <SearchIcon />
              검색
            </Button>
          </SearchBar>
          <SelectWrap>
            <h3>
              <strong>9명 </strong>코치
            </h3>
            <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
              <StyledSelect
                value={select}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <StyledMenuItem value={10}>인기순</StyledMenuItem>
                <StyledMenuItem value={20}>이름순</StyledMenuItem>
                <StyledMenuItem value={30}>추천순</StyledMenuItem>
              </StyledSelect>
            </FormControl>
          </SelectWrap>
          <Grid container spacing={1}>
            <Card item xs={6} md={4}>
              <Item>
                <CoachCard />
              </Item>
            </Card>
            <Card item xs={6} md={4}>
              <Item>
                <CoachCard />
              </Item>
            </Card>
            <Card item xs={6} md={4}>
              <Item>
                <CoachCard />
              </Item>
            </Card>
            <Card item xs={6} md={4}>
              <Item>
                <CoachCard />
              </Item>
            </Card>
            <Card item xs={6} md={4}>
              <Item>
                <CoachCard />
              </Item>
            </Card>
            <Card item xs={6} md={4}>
              <Item>
                <CoachCard />
              </Item>
            </Card>
            <Card item xs={6} md={4}>
              <Item>
                <CoachCard />
              </Item>
            </Card>
            <Card item xs={6} md={4}>
              <Item>
                <CoachCard />
              </Item>
            </Card>
            <Card item xs={6} md={4}>
              <Item>
                <CoachCard />
              </Item>
            </Card>
          </Grid>
          {/* <PaginationBox /> */}
          <PaginationWrap>
            <StyledPagination count={50} color="primary" />
          </PaginationWrap>
        </Container>
      </ThemeProvider>
    </>
  );
};

const Container = styled(Box)`
  width: 118rem;
  margin: 0 auto;
  padding-bottom: 10rem;
  @media ${() => theme.device.desktop} {
    width: 90%;
  }
`;

const Banner = styled(Box)`
  width: 100%;
  height: 30rem;
  margin-top: 8rem;
  background-color: #fff8f3;
  background-image: url(../img/banner.png);
  background-position: center;
  background-size: cover;
  .text-wrap {
    height: 30rem;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    h4 {
      font-size: 1.4rem;
      color: #ff7134;
      font-weight: bold;
      line-height: 150%;
    }
    h1 {
      font-size: 3rem;
      color: #3b3b3b;
      line-height: 150%;
      font-weight: bold;
    }
    p {
      font-size: 1.6rem;
      color: #3b3b3b;
      line-height: 150%;
      margin-top: 1rem;
    }
  }
  @media ${() => theme.device.tablet} {
    margin-top: 6rem;
  }
  @media ${() => theme.device.mobile} {
    .text-wrap {
      h1 {
        font-size: 2.5rem;
      }
    }
  }
`;

const SearchBar = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 3rem 0;
  button {
    box-shadow: none;
    color: #fff;
    padding: 1rem 2rem;
    width: 20rem;
    font-size: 1.6rem;
    margin-left: 1rem;
    svg {
      width: 2rem;
      height: 2rem;
      margin-right: 1rem;
    }
  }
`;

const SelectWrap = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    font-size: 1.8rem;
    color: #3b3b3b;
    line-height: 150%;
    strong {
      font-weight: bold;
    }
  }
`;

const StyledTextField = styled(TextField)`
  input {
    font-size: 1.6rem;
    color: #3b3b3b;
    padding: 1.2rem 2rem;
  }
`;
const StyledSelect = styled(Select)`
  font-size: 1.4rem;
`;

const StyledMenuItem = styled(MenuItem)`
  font-size: 1.4rem;
`;
const Card = styled(Grid)``;

const PaginationWrap = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 5rem;
`;

const StyledPagination = styled(Pagination)`
  button {
    font-size: 1.4rem;
  }
  .Mui-selected {
    color: #fff !important;
  }
  svg {
    width: 2rem;
    height: 2rem;
  }
`;

export default CoachList;
