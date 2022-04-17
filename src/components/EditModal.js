import React from "react";

//MUI
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';



const EditModal= () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <div  style={{marginLeft: "auto", marginRight: "13px"}}>
        <IconButton onClick={handleOpen}>
            <MoreHorizIcon/>
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ width: 400, height: 450, margin: 'auto', background: "white", display: 'inline-flexbox', marginTop: "250px", borderRadius: "5px" }}>
             <EditBox>
               <EditButton style={{borderRadius: "5px 5px 0px 0px"}}><p style={{color: "red", fontWeight: "700"}}>Delete</p></EditButton>
             </EditBox>
             <EditBox>
               <EditButton >Edit</EditButton>
             </EditBox>
             <EditBox>
               <EditButton >Hide like count</EditButton>
             </EditBox>
             <EditBox>
               <EditButton >Turn off commenting</EditButton>
             </EditBox>
             <EditBox>
               <EditButton >go to post</EditButton>
             </EditBox>
             <EditBox>
               <EditButton >Share to...</EditButton>
             </EditBox>
             <EditBox>
               <EditButton >Copy Link</EditButton>
             </EditBox>
             <EditBox>
               <EditButton >Embded</EditButton>
             </EditBox>
             <EditBox style={{borderBottom: "0px"}}>
               <EditButton style={{borderRadius: "0px 0px 5px 5px"}} onClick={handleClose}>Cancel</EditButton>
             </EditBox>
          </Box>
        </Modal>
      </div>
    );
  }

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

const EditBox = styled('div') ({
width: "400px",
height: "49px",
display: "flex",
justifyContent: "center",
borderBottom: "1px solid #e2e2e1"
})

export default EditModal;