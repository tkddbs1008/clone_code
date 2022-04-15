import React from 'react';

//MUI
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import IconButton from '@mui/material/IconButton';


const Header = (props) => {
    return (
        <Boxx>
            <ImageButton>
                <ImageSrc/>
            </ImageButton>
            <div style={{marginLeft: "auto"}}>
                <IconButton>
                    <HomeOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <SendOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <AddBoxOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <ExploreOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <FavoriteBorderIcon/>
                </IconButton>
                <IconButton>
                    <CircleOutlinedIcon/>
                </IconButton>
            </div>
        </Boxx>
    )
}

const Boxx = styled(Box) ({
borderBottom: "1px solid #e2e2e1",
height: "60px",
display: "flex",
alignItems: "center",
})

const ImageButton = styled(ButtonBase) ({
width: "103px",
height: "29px",
marginLeft: "15px",
display: "flex",

})

const ImageSrc = styled('span')({
position: 'absolute',
left: 0,
right: 0,
top: 0,
bottom: 0,
backgroundSize: 'cover',
backgroundPosition: 'center',
backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png)`
});

export default Header;