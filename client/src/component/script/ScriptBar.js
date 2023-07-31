import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,Divider,Icon,ThemeProvider} from '@mui/material';
import { Box, IconButton,Button } from "@mui/material";
import FilledBtn from "../button/FilledBtn";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import theme from "../../style/theme";
import AiFeedbackModal from "./modal/AiFeedbackModal";
import StatisticsModal from "./modal/StatisticsModal";

export default function ScriptBar({state}){
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
    return(
        <>
        <ThemeProvider theme={theme}>
                <PC>
                    <ScriptBarWrap>
                        {
                            state ?
                            <ul className="btn-wrap">
                                <li>
                                    <FilledBtn text={"코치 연결하기"} state={"disabled"}/>
                                    <FilledBtn text={"연습 시작하기"}  state={"disabled"}/>
                                </li>
                                <li>
                                    <PlayBtn variant="contained" disabled><PlayArrowIcon/></PlayBtn>
                                </li>
                                <li>
                                    <FilledBtn text={"X 1"}  state={"disabled"}/>
                                    <FilledBtn text={"통계보기"}  state={"disabled"}/>
                                    <FilledBtn text={"AI 피드백"} state={"disabled"}/>
                                </li>
                            </ul>
                            :
                            <ul className="btn-wrap activate">
                                <li>
                                    <FilledBtn text={"코치 연결하기"} />
                                    <FilledBtn text={"연습 시작하기"} />
                                </li>
                                <li>
                                    <PlayBtn variant="contained" ><PlayArrowIcon/></PlayBtn>
                                </li>
                                <li>
                                    <FilledBtn text={"X 1"}  />
                                    <StatisticsModal />
                                    <AiFeedbackModal />
                                </li>
                            </ul>
                        }
                    </ScriptBarWrap>
                </PC>
                <Mobile>
                    <ScriptBarWrap>
                        {
                        state ?
                         <ul className="btn-wrap">
                            <li>
                                <PlayBtn variant="contained" disabled><PlayArrowIcon/></PlayBtn>
                            </li>
                            <li>
                                <FilledBtn text={"코치 연결하기"} state={"disabled"}/>
                                <FilledBtn text={"연습 시작하기"}  state={"disabled"}/>
                                <FilledBtn text={"X 1"}  state={"disabled"}/>
                                <FilledBtn text={"통계보기"}  state={"disabled"}/>
                                <FilledBtn text={"AI 피드백"} state={"disabled"}/>
                            </li>
                        </ul>
                        :
                        <ul className="btn-wrap activate">
                        <li>
                            <PlayBtn variant="contained"><PlayArrowIcon/></PlayBtn>
                        </li>
                        <li>
                            <FilledBtn text={"코치 연결하기"} />
                            <FilledBtn text={"연습 시작하기"} />
                            <FilledBtn text={"X 1"}/>
                            <StatisticsModal />
                            <AiFeedbackModal />
                        </li>
                    </ul>
                    }
                    </ScriptBarWrap>
                </Mobile>


        </ThemeProvider>
        </>
    )
}

const PC = styled(Box)`
    width: 100%;
    @media ${() => theme.device.mobile} {
        display: none;
    }
`;
const Mobile = styled(Box)`
    display: none;
    width: 100%;
    @media ${() => theme.device.mobile} {
        display: block;
    }
`;



const ScriptBarWrap = styled(Box)`
    background-color: #FF7134;
    width: 100%;
    height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    .activate{
        button{
            svg{
                color: #FF7134 !important;
            }
        }
    }
    .btn-wrap{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;
        width: 65%;
        li{
            display: flex;
            align-items: center;
        }
        button{
            font-size: 1.6rem;
            padding: 1rem 3rem;
            margin-right: 2rem;
        }
        .Mui-disabled{
            background-color: #E0E0E0;
        }
    }
    @media ${() => theme.device.desktop} {
        .btn-wrap{
            width: 100%;
        }
    }  
    @media ${() => theme.device.desktop2} {
        .btn-wrap{
            button{
                font-size: 1.4rem;
                padding: .5rem 2rem;
            }
        }
    }  
    @media ${() => theme.device.mobile} {
        height: 20rem;
        padding: 2rem 0;
        .btn-wrap{
            li{
                margin: 0;
            }
            button{
                margin-bottom: 1rem;
            }
            button:last-of-type{
                margin-bottom: 1rem;
            }
            li:last-of-type{
                width: 100%;
                margin-top: 1rem;
                padding: 0 5%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
            }
        }
    }
`;

const PlayBtn = styled(IconButton)`
    width: 5rem;
    height: 5rem;
    padding: 0 !important;
    background-color: #fff;
    &:hover{
        background-color: #fff;
    }
    svg{ 
        width: 2.5rem;
        height: 2.5rem;
    }
    @media ${() => theme.device.desktop2} {
        width: 3.5rem;
        height: 3.5rem;
        svg{
            width: 2rem;
            height: 2rem;
        }
    }  
    @media ${() => theme.device.mobile} {
        width: 5rem;
        height: 5rem;
        margin-bottom: 0 1rem 0 0 !important;
        svg{
            width: 3rem;
            height: 3rem;
        }
    }
`;