import React from 'react';
//MUI
import { styled } from '@mui/material/styles';


const Comment = (props) => {
    return(
        <div style={{height: "50px", display: "flex", marginTop: "13px"}}>
            <CommentImg/>
            <Commentname> username <CommentDate>1 day ago</CommentDate></Commentname>
            <Cmnt> content </Cmnt>
        </div>
    )
}

const CommentImg = styled('div') ({
width: '32px',
height: '32px',
background: "grey",
borderRadius: "16px",
marginLeft: "13px",
})

const Commentname = styled('span') ({
fontSize: "14px",
fontWeight: "500",
margin: "1px 3px 0px 13px"
})

const CommentDate = styled('p') ({
fontSize: "12px",
color: "#B7BBBD",
padding: "0px",
margin: "0px",
marginTop: "10px"
})

const Cmnt = styled('p') ({
fontSize: "15px",
margin: "0px 3px 0px 5px"
})

export default Comment;