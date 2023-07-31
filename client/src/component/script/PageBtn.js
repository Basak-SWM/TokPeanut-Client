import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,Divider,Icon,ThemeProvider} from '@mui/material';
import { Box, IconButton,Button } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import theme from "../../style/theme";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function PageBtn({state}){
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
                <PageBtnWrap>
                    {
                        state == "disabled" ?
                        <ul>
                            <li>
                                <Button disabled>1</Button>
                                <Checkbox {...label} icon={<StarBorderIcon />} checkedIcon={<StarIcon />} disabled />
                            </li>
                            <li>
                                <Button disabled>2</Button>
                                <Checkbox {...label} icon={<StarBorderIcon />} checkedIcon={<StarIcon />} disabled/>
                            </li>
                            <li>
                                <Button disabled>3</Button>
                                <Checkbox {...label} icon={<StarBorderIcon />} checkedIcon={<StarIcon />} disabled/>
                            </li>
                            <li>
                                <Button disabled>4</Button>
                                <Checkbox {...label} icon={<StarBorderIcon />} checkedIcon={<StarIcon />} disabled/>
                            </li>
                            <li>
                                <Button disabled>5</Button>
                                <Checkbox {...label} icon={<StarBorderIcon />} checkedIcon={<StarIcon />} disabled/>
                            </li>
                            <li>
                                <Button disabled>6</Button>
                                <Checkbox {...label} icon={<StarBorderIcon />} checkedIcon={<StarIcon />} disabled/>
                            </li>
                        </ul>
                        :
                        <ul>
                        <li>
                            <Button>1</Button>
                            <Checkbox {...label} icon={<StarBorderIcon />} checkedIcon={<StarIcon />}/>
                        </li>
                        <li className="select">
                            <Button>2</Button>
                            <Checkbox {...label} icon={<StarBorderIcon />} checkedIcon={<StarIcon />}/>
                        </li>
                        <li>
                            <Button>3</Button>
                            <Checkbox {...label} icon={<StarBorderIcon />} checkedIcon={<StarIcon />}/>
                        </li>
                        <li>
                            <Button>4</Button>
                            <Checkbox {...label} icon={<StarBorderIcon />} checkedIcon={<StarIcon />}/>
                        </li>
                        <li>
                            <Button>5</Button>
                            <Checkbox {...label} icon={<StarBorderIcon />} checkedIcon={<StarIcon />}/>
                        </li>
                        <li>
                            <Button>6</Button>
                            <Checkbox {...label} icon={<StarBorderIcon />} checkedIcon={<StarIcon />}/>
                        </li>
                    </ul>
                    }
                </PageBtnWrap>
            </ThemeProvider>
        </>
    )
}

const PageBtnWrap = styled(Box)`
    width: 10rem;
    /* border: 1px solid red; */
    position: sticky;
    top: 0;
    right: 3%;
    ul{
        max-height: 80vh;
        overflow-y: scroll;
        background-color: #fff;
        border: 1px solid rgba(0,0,0,.1);
        margin-top: 13rem;
        .select{
            button{
                background-color: #FFEEE0;
                color: #FF7134;
            }
        }
        li:last-of-type{
            border: none;
        }
        li{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 10rem;
            height: 10rem;
            border-bottom: 1px solid rgba(0,0,0,.1);
            position: relative;
            button{
                width: 100%;
                font-size: 2.5rem;
                color: #3b3b3b;
                height: 100%;
                box-shadow: none;
                border-radius: 0;
            }
            span{
                position: absolute;
                top:0;
                right: 0;
                svg{
                    width: 2rem;
                    height: 2rem;
                }
            }
        }
    }

    @media ${() => theme.device.mobile} {
        width: 100%;
        position: static;
        margin-bottom: 3rem;
        ul{
            display: flex;
            align-items: center;
            overflow-y: scroll;
            margin-top: 10rem;
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
            li{
                border-bottom: none;
                border-right: 1px solid rgba(0,0,0,.1);
                height: 6rem;
                width: 8rem;
                button{
                    font-size: 2rem;
                }
                span{
                  svg{
                    width: 1.5rem;
                    height: 1.5rem;
                  }
                }
            }
        }
        ul::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
        }
    }
`;