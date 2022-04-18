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
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


//components
import EditModal from '../components/EditModal';



const ProfilePage = (props) => {
  const post_list = useSelector((state)=> state.post.list)
  console.log(post_list)
  const param = useParams();
  const user = param.user
  const post = param.post
  const nav = useNavigate();
  const [CommentData, setComment] = React.useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    nav(`/profile/${user}/`);
    setOpen(false);
  }

  React.useEffect(() => {

  })

  const handleChange = (event) => {
  setComment(event.target.value);
    };

    return (
        <div>
            <Header/>
            <Boxx>
                <header>
                    <div>
                        <ProfileImg/>
                    </div>
                    <div>
                        <grid>
                            <h1>Username</h1>
                             <div>
                                <Button>Edit profile</Button>
                            </div>
                        </grid>
                    </div>
                </header>
                <ImageList sx={{ maxWidth: 970 }} cols={3} gap={40}>
                    {post_list?.map((item, idx) => (
                        <ImageListItem key={item.idx}>
                            <ImageButton onClick={() => {nav(`/profile/${user}/${idx}`); handleOpen()} }>
                                <img
                                src={`${item.img}?w=293&h=293&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=293&h=293&fit=crop&auto=format&dpr=2 2x`}
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
                    <PostImgContainer>
                      <PostImg style={{backgroundImage: `url(${post_list[post]?.img})`}}/>
                    </PostImgContainer>
                    <PostContent>
                        <PostHeader>
                            <CommentImg/>
                            <Commentname>username</Commentname>
                            <EditModal/>
                        </PostHeader>
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

const PostImgContainer = styled('div') ({
width: "60%",
height: "100%",
backgroundColor: "black",
margin: "0px",
})

const PostImg = styled('div') ({
backgroundSize: "contain",
backgroundPosition: "center",
width: "100%",
height: "100%",
backgroundRepeat: "no-repeat",
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
borderRadius: "75px",
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








