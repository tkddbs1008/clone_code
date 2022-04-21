import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { actionCreators as postActions } from "../redux/modules/post";
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { actionsCreators as imageActions } from "../redux/modules/image";


const PostEdit = (props) => {


    const token = document.cookie.split('=')[1]

    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState();
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const Send = () => {
        dispatch(postActions.updatePostDB(props.postid, value, token))
    }

  return (
    <div>
        <EditButton onClick={handleOpen} >Edit</EditButton>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={stylee}>
                <PostWrites>
                    <b style={{fontWeight: "500" }}>Create new post</b>
                    <button onClick={Send}>Edit</button>
                </PostWrites>
                <div style={{display: "flex"}}>
                <PostImgContainer style={{backgroundImage: `url(${props.imageUrl})`}}/>
                <PostContent>
                    <PostHeader>
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
    </div>
  );
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


const EditButton = styled('button') ({
  width: "400px",
  border: "0px",
  background: "white",
  '&:hover': {
    cursor: "pointer",
  },
  '&:active': {
    background: "#e2e2e1"
  }
})

const PostHeader = styled('div') ({
width: "100%",
height: "60px",
display: "flex",
alignItems: "center"
})

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
export default PostEdit;