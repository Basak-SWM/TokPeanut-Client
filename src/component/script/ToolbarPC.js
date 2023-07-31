import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,Divider,Icon,ThemeProvider} from '@mui/material';
import { Box, IconButton,Button } from "@mui/material";
import theme from "../../style/theme";
export default function ToolBarPC({state}){

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
                {
                state == "disabled" ?
                <Disabled>
                    <ToolBarWrap>
                        <ul className="disabled">
                            <li>
                                <Button disabled>
                                    <img src="/img/script/toolbar/pencil.svg"/>
                                    <p>연필</p>
                                </Button>
                            </li>
                            <li>
                                <Button disabled>
                                    <img src="/img/script/toolbar/pencil.svg"/>
                                    <p>연필</p>
                                </Button>
                            </li>
                            <li>
                                <Button disabled>
                                    <img src="/img/script/toolbar/pencil.svg"/>
                                    <p>연필</p>
                                </Button>
                            </li>
                            <li>
                                <Button disabled>
                                    <img src="/img/script/toolbar/pencil.svg"/>
                                    <p>연필</p>
                                </Button>
                            </li>
                            <li>
                                <Button disabled>
                                    <img src="/img/script/toolbar/down-left.svg"/>
                                    <p>확대</p>
                                </Button>
                            </li>
                            <li>
                                <Button disabled>
                                    <img src="/img/script/toolbar/pause.svg"/>
                                    <p>멈춤</p>
                                </Button>
                            </li>
                            <li>
                                <Button disabled>
                                    <img src="/img/script/toolbar/mouse.svg"/>
                                    <p>클릭</p>
                                </Button>
                            </li>
                            <li>
                                <Button disabled>
                                    <img src="/img/script/toolbar/slash.svg"/>
                                    <p>슬래시</p>
                                </Button>
                            </li>
                        </ul>
                    </ToolBarWrap>
                </Disabled>
                :
                <Activate>
                    <ToolBarWrap>
                        <ul className="activate">
                            <li>
                                <Button className="color" id="color1">
                                    <img src="/img/script/toolbar/color/pencil1.svg"/>
                                    <p>연필</p>
                                </Button>
                            </li>
                            <li className="select">
                                <Button className="color" id="color2">
                                    <img src="/img/script/toolbar/color/pencil2.svg"/>
                                    <p>연필</p>
                                </Button>
                            </li>
                            <li>
                                <Button className="color" id="color3">
                                    <img src="/img/script/toolbar/color/pencil3.svg"/>
                                    <p>연필</p>
                                </Button>
                            </li>
                            <li>
                                <Button>
                                    <img src="/img/script/toolbar/pencil.svg"/>
                                    <p>연필</p>
                                </Button>
                            </li>
                            <li>
                                <Button>
                                    <img src="/img/script/toolbar/down-left.svg"/>
                                    <p>확대</p>
                                </Button>
                            </li>
                            <li>
                                <Button>
                                    <img src="/img/script/toolbar/pause.svg"/>
                                    <p>멈춤</p>
                                </Button>
                            </li>
                            <li>
                                <Button>
                                    <img src="/img/script/toolbar/mouse.svg"/>
                                    <p>클릭</p>
                                </Button>
                            </li>
                            <li>
                                <Button>
                                    <img src="/img/script/toolbar/slash.svg"/>
                                    <p>슬래시</p>
                                </Button>
                            </li>
                        </ul>
                    </ToolBarWrap>
                </Activate>
                }
            </ThemeProvider>
        </>
    )
}

const Disabled= styled(Box)`
    height: 100vh;
    background-color: #E0E0E0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: 0;
    left: 0;
    .disabled{
        background-color: #E0E0E0;
    }
    @media ${() => theme.device.mobile} {
        display: none;
    }
`;


const Activate= styled(Box)`
    height: 100vh;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: 0;
    left: 0;
    @media ${() => theme.device.mobile} {
        display: none;
    }
`;


const ToolBarWrap = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    & > ul{
        margin-top: 5rem;
        background-color: #fff;
        .select{
            background-color: #FFE9D9;
            #color1{
                p{
                    color: #FFE609;
                }
            }
            #color2{
                p{
                    color: #FF5EEF;
                }
            }
            #color3{
                p{
                    color: #0FF80A;
                }
            }
            p{
                font-weight: bold;
                color: #838383;
            }
        }
        li:last-of-type{
            border-bottom: none;
        }
        li{
            width: 10rem;
            height: 10rem;
            border-bottom: 1px solid rgba(0,0,0,.1);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            p{
                font-size: 1.4rem;
                color: #AEAEAE;
                line-height: 150%;
            }
            button{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                img{
                    width: 2rem;
                    height: 2rem;
                    margin-bottom: 1rem;
                }
            }
        }
    }
    .activate{
        li{
            button:not(.color){
                img{
                    filter: invert(53%) sepia(0%) saturate(0%) hue-rotate(352deg) brightness(98%) contrast(89%);
                }
            }
        }
    }

    @media ${() => theme.device.desktop} {
        &>ul{
            li{
                width: 8rem;
                height: 8rem;
            }
        }
    }
    @media ${() => theme.device.desktop2} {
        &>ul{
            li{
                width: 7rem;
                height: 7rem;
            }
        }
    }
`;