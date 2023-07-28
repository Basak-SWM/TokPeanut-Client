import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,Divider,Fab,Icon,ThemeProvider} from '@mui/material';
import { Box, IconButton,Button } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Switch from '@mui/material/Switch';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

import theme from "../../style/theme";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'absolute',
    color : '#fff'
  }));
  
  const actions = [
    { icon: <img src="/img/script/toolbar/pencil.svg" />, name: '연필' },
    { icon: <img src="/img/script/toolbar/pencil.svg"/>, name: '연필' },
    { icon: <img src="/img/script/toolbar/pencil.svg"/>, name: '연필' },
    { icon: <img src="/img/script/toolbar/pencil.svg"/>, name: '연필' },
    { icon: <img src="/img/script/toolbar/down-left.svg"/>, name: '확대' },
    { icon: <img src="/img/script/toolbar/pause.svg"/>, name: '멈춤' },
    { icon: <img src="/img/script/toolbar/mouse.svg"/>, name: '클릭' },
    { icon: <img src="/img/script/toolbar/slash.svg"/>, name: '슬래시' },
  ];

  const actions2 = [
    { icon: <img src="/img/script/toolbar/color/pencil1.svg" />, name: '연필' },
    { icon: <img src="/img/script/toolbar/color/pencil2.svg"/>, name: '연필' },
    { icon: <img src="/img/script/toolbar/color/pencil3.svg"/>, name: '연필' },
    { icon: <img src="/img/script/toolbar/pencil.svg"/>, name: '연필' },
    { icon: <img src="/img/script/toolbar/down-left.svg"/>, name: '확대' },
    { icon: <img src="/img/script/toolbar/pause.svg"/>, name: '멈춤' },
    { icon: <img src="/img/script/toolbar/mouse.svg"/>, name: '클릭' },
    { icon: <img src="/img/script/toolbar/slash.svg"/>, name: '슬래시' },
  ];
  

export default function ToolBarMo({state}){
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


    const [direction, setDirection] = React.useState('down');
    const [hidden, setHidden] = React.useState(false);

    return(
        <>
            <ThemeProvider theme={theme}>
                <ToolBarBtn>
                    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
                        <Box sx={{ position: 'relative', mt: 3, height: 320 }}>
                            {
                                state ?
                                <StyledSpeedDial
                                ariaLabel="SpeedDial playground example"
                                hidden={hidden}
                                icon={<SpeedDialIcon />}
                                direction={direction}
                                >

                                    {actions.map((action) => (
                                        <StyledSpeedDialAction
                                        key={action.name}
                                        icon={action.icon}
                                        tooltipTitle={action.name}
                                        disabled
                                        />
                                    ))}
                                </StyledSpeedDial>
                                :
                                <StyledSpeedDial
                                ariaLabel="SpeedDial playground example"
                                hidden={hidden}
                                icon={<SpeedDialIcon />}
                                direction={direction}
                                >

                                    {actions2.map((actions2) => (
                                        <StyledSpeedDialAction2
                                        key={actions2.name}
                                        icon={actions2.icon}
                                        tooltipTitle={actions2.name}
                                        />
                                    ))}
                                </StyledSpeedDial>
                            }
                        </Box>
                    </Box>
                </ToolBarBtn>
            </ThemeProvider>
        </>
    )
}


const ToolBarBtn = styled(Box)`
    display: none;
    position: absolute;
    top: 0;
    left: 2rem;
    z-index: 100;
    .MuiSpeedDialIcon-root{
        svg{
            width: 2.5rem;
            height: 2.5rem;
            color: #fff;
        }
    }
    @media ${() => theme.device.mobile} {
        display: block;
    }
`;

const StyledSpeedDialAction = styled(SpeedDialAction)`
    background-color: #E0E0E0 !important;
    img{
        width: 1.5rem;
        filter: invert(19%) sepia(3%) saturate(12%) hue-rotate(339deg) brightness(92%) contrast(84%);
    }
`;

const StyledSpeedDialAction2 = styled(SpeedDialAction)`
    background-color: #fff !important;
    img{
        width: 1.5rem;
    }
`;