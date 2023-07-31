import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,Divider,Icon,ThemeProvider} from '@mui/material';
import { Box, IconButton,Button } from "@mui/material";
import FilledBtn from "../button/FilledBtn";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import theme from "../../style/theme";
import SolideBtn from "../../component/button/SolidBtn"
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import PauseIcon from '@mui/icons-material/Pause';
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
                            <ul className="btn-wrap">
                                <li>
                                    <FilledBtn text={"취소하기"}/>
                                </li>
                                <li>
                                    <PlayBtn variant="contained"><PlayArrowIcon/></PlayBtn>
                                    <PlayBtn variant="contained"><KeyboardVoiceIcon/></PlayBtn>
                                    <PlayBtn variant="contained"><PauseIcon/></PlayBtn>
                                </li>
                                <li>
                                    <SolideBtn text={"완료하기"} color={"white"}/>
                                </li>
                            </ul>
                    </ScriptBarWrap>
                </PC>
                <Mobile>
                    <ScriptBarWrap>
                         <ul className="btn-wrap">
                            <li>
                                <PlayBtn variant="contained"><PlayArrowIcon/></PlayBtn>
                                <PlayBtn variant="contained"><KeyboardVoiceIcon/></PlayBtn>
                                <PlayBtn variant="contained"><PauseIcon/></PlayBtn>
                            </li>
                            <li>
                                <FilledBtn text={"취소하기"}/>
                                <SolideBtn text={"완료하기"} color={"white"}/>
                            </li>
                        </ul>
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
    .btn-wrap{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0 3rem;
        button{
            font-size: 1.6rem;
            padding: 1rem 3rem;
            margin-right: 2rem;
            svg{
                color: #FF7134 !important;
            }
        }
        button:last-of-type{
            margin: 0;
        }
        .Mui-disabled{
            background-color: #E0E0E0;
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
        .btn-wrap{ 
            justify-content: center;
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
        svg{
            width: 3rem;
            height: 3rem;
        }
    }
`;