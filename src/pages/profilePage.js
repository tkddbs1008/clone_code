import React from 'react';
import Header from '../Shared/header';

//MUI
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ButtonBase from '@mui/material/ButtonBase';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import Comment from '../components/comment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

//

const ProfilePage = (props) => {
    const [values, setValues] = React.useState();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (prop) => (event) => {
    setValues(event.target.value);
    };

    return (
        <div>
            <Header/>
            <Boxx>
                <header style={{display: "flex"}}>
                    <div>
                        <ProfileImg/>
                    </div>
                    <div>
                        <grid>
                            <h1>Username</h1>
                             <div>
                                <Button onClick={handleOpen}>Open modal</Button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Text in a modal
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                    </Typography>
                                    </Box>
                                </Modal>
                            </div>
                        </grid>
                    </div>
                </header>
                <ImageList sx={{ maxWidth: 975 }} cols={3} gap={20}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                            <ImageButton  onClick={handleOpen}>
                                <img
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                                />
                            </ImageButton>
                        </ImageListItem>
                    ))}
                </ImageList>
            </Boxx>
             <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <PostImg>

                    </PostImg>
                    <PostContent>
                        <PostHeader>
                            <CommentImg/>
                            <Commentname>username</Commentname>
                            <IconButton sx={{marginLeft: "auto", marginRight: "13px"}}>
                                <MoreHorizIcon />
                            </IconButton>
                        </PostHeader>
                        <Comment/>
                        <Comment/>
                            <CommentWrite>
                                <SentimentSatisfiedAltIcon sx={{marginLeft: "13px"}}/>
                                <div style={{width: "100%"}}>
                                    <CommentBox placeholder='Add a comment...'/>
                                </div>
                                <div style={{marginLeft: "auto", marginRight: "13px"}}>
                                    <Send onClick={() => console.log('clicked')}><b>Post</b></Send>
                                </div>
                            </CommentWrite>
                    </PostContent>
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

const Send = styled('button') ({
border: "0px",
background: "transparent",
color: "#0095f6",
'&:hover':{
    cursor: "pointer",
    opacity: "80%"
}

})

const CommentBox = styled('input') ({
border: "0px",
height: "30px",
marginLeft: "13px",
width: "90%"
})

const style = {
position: 'absolute',
top: '50%',
left: '50%',
transform: 'translate(-50%, -50%)',
width: '66%',
height: '80%',
bgcolor: 'background.paper',
boxShadow: 0,
p: 0,
borderRadius: '0px 5px 5px 0px',
display: "inline-flex"
};

const PostImg = styled('div') ({
width: "60%",
height: "100%",
backgroundColor: "black",
margin: "0px",
})

const PostContent = styled('div') ({
float: "right",
width: "500px",
})

const PostHeader = styled('div') ({
width: "100%",
height: "60px",
borderBottom: "1px solid #e2e2e1",
display: "flex",
alignItems: "center"
})

const CommentImg = styled('div') ({
width: '32px',
height: '32px',
background: "grey",
borderRadius: "16px",
marginLeft: "13px",
})

const Commentname = styled('p') ({
fontSize: "14px",
fontWeight: "500",
marginLeft: "13px"
})

const ProfileImg = styled('div') ({
width: "150px",
height: "150px",
background: "#62676A",
borderRadius: "75px"
})

const Boxx = styled(Box) ({
maxWidth: "975px",
height: "100%",
padding: "30px 20px 0px",
margin: "auto",
background: "#F7F7F8",
border: "1px solid black",
})

const CommentWrite = styled('div') ({
height: "53px",
borderTop: "1px solid #e2e2e1",
display: "inline-flex",
alignItems: "center",
width: "100%"
})

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  '&:hover, &.Mui-focusVisible': {
        filter: "brightness(80%)",
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

export default ProfilePage;








const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
];