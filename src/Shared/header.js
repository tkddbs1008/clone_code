import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionsCreators as imageActions } from "../redux/modules/image";
import { actionCreators as postActions } from "../redux/modules/post";
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
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
//Image
import InsertFile from '../images/InsertFile.PNG'

//RRD
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
    const dispatch = useDispatch();

    const token = document.cookie.split('=')[1]
    //게시물 정보
    const [ImgFile, setImgFile] = React.useState('')
    const [value, setValue] = React.useState();
    //모달
    const [open, setOpen] = React.useState(false);
    const nav = useNavigate();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const preview = useSelector((state) => state.image.preview)
    const reader = new FileReader();
    const hidden = React.useRef(null);

    const handleClick = (e) => {
        hidden.current.click();
    }

    const selectFile = (e) => {
        const _file = e.target.files[0];
        setImgFile(e.target.files[0])
        reader.readAsDataURL(_file);
        reader.onloadend = () => {
                dispatch(imageActions.setPreview(reader.result));
            }
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const Send = () => {
        dispatch(postActions.addPostDB(value, ImgFile, token))
        handleClose();
    }

    return (
        <Boxx>
            <ImageButton>
                <ImageSrc onClick={() => nav('/')}/>
            </ImageButton>
            <div style={{marginLeft: "auto",}}>
                <IconButton>
                    <HomeOutlinedIcon sx={{color: "black"}}/>
                </IconButton>
                <IconButton>
                    <SendOutlinedIcon sx={{color: "black"}}/>
                </IconButton>
                <IconButton onClick={handleOpen}>
                    <AddBoxOutlinedIcon sx={{color: "black"}}/>
                </IconButton>
                <IconButton>
                    <ExploreOutlinedIcon sx={{color: "black"}}/>
                </IconButton>
                <IconButton>
                    <FavoriteBorderIcon sx={{color: "black"}}/>
                </IconButton>
                <IconButton onClick={()=> nav('/profile/1')} sx={{color: "black"}}>
                    <CircleOutlinedIcon />
                </IconButton>
            </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
                {preview ?
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={stylee}>
                        <PostWrites>
                            <b style={{fontWeight: "500" }}>Create new post</b>
                            <button onClick={Send}>Share</button>
                        </PostWrites>
                        <div style={{display: "flex"}}>
                        <PostImgContainer style={{backgroundImage: `url(${preview})`}} />
                        <PostContent>
                            <PostHeader>
                                <CommentImg/>
                                <Commentname>username</Commentname>
                            </PostHeader>
                             <TextField
                                id="standard-multiline-static"
                                label="Multiline"
                                multiline
                                rows={4}
                                value={value}
                                variant="standard"
                                onChange={handleChange}
                            />
                        </PostContent>
                        </div>
                    </Box>
                </Modal>
                :
                <Box sx={style}>
                    <PostWrites>
                        <b style={{fontWeight: "500" }}>Create new post</b>
                    </PostWrites>
                    <Content>
                        <img alt='placehold' src={InsertFile} />
                        <p style={{fontSize: "21px"}}>Drag photos and videos here</p>
                        <input type="file" onChange={selectFile} ref={hidden} id="fileUpload" accept="image/jpeg, image/png, image/jpg" style={{display: "none"}}/>
                        <Submit onClick={handleClick}>Select from computer</Submit>
                    </Content>
                </Box>
                }
        </Modal>
        </Boxx>

    )
}

const Submit = styled('button') ({
width: "157px",
height: "30px",
color: "white",
backgroundColor: "#0095f6",
border: "0px",
borderRadius: "5px",
'&:hover': {
    cursor: "pointer"
},
'&:active': {
    opacity: "0.7"
}
})

const Content = styled('div') ({
display: "flex",
justifyContent: "center",
alignItems: "center",
flexDirection: "column",
})

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "45%",
  bgcolor: 'background.paper',
  height: "82%",
  borderRadius: "15px"
};

const PostWrites = styled('div') ({
height: "42px",
alignItems: "center",
display: "flex",
justifyContent: "center",
borderBottom: "1px solid #e2e2e1"
})

const PostImgContainer = styled('div') ({
minWidth: "350px",
maxWidth: "50%",
minHeight: "350px",
maxHeight: "100%",
backgroundColor: "black",
backgroundSize: "contain",
backgroundPosition: "center",
backgroundRepeat: "no-repeat",
margin: "0px",
display: "flex"
})

const PostHeader = styled('div') ({
width: "100%",
height: "60px",
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

const PostContent = styled('div') ({
width: "300px",
})

const stylee = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  bgcolor: 'background.paper',
  height: "82%",
  borderRadius: "15px"
};

export default Header;