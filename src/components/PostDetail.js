import React from 'react';
import EditModal from './EditModal';

//MUI
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commentActions } from '../redux/modules/post';

const PostDetail = (props) => {

    const userid = useSelector((state) => state.user.user?.userid)
    const [comment, setComment] = React.useState('')
    const dispatch = useDispatch();
    const handleComment = (e) => {
        setComment(e.target.value)
    }
    return (
            <Modal
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                open={props.open}
                onClose={props.handleClose}
            >
                <Box sx={style}>
                <PostImgContainer>
                    <PostImg style={{backgroundImage: `url(${props?.imageUrl})`}} />
                </PostImgContainer>
                <PostContent>
                    <PostHeader>
                        <CommentImg style={{backgroundImage: `url(${props?.userResponseDto?.profile})`}}/>
                        <Commentname>{props?.userResponseDto?.username}</Commentname>
                        <EditModal {...props} />
                    </PostHeader>
                        <div>
                        {props?.comments?.map((el, idx) => {
                            return (
                                 <div key={idx} style={{height: "50px", display: "flex", marginTop: "13px"}}>
                                 <CommentImg/>
                                 <Commentname>{el.nickname}<CommentDate>{el.createdAt}</CommentDate></Commentname>
                                 <Cmnt>{el.content}</Cmnt>
                                 {el.userid === userid ?
                                 <Delete onClick={() => dispatch(commentActions.deleteComment(el.id))}>delete</Delete>
                                 :
                                 null
                                 }
                             </div>
                            )
                        })}
                        </div>
                        <CommentWrite>
                            <SentimentSatisfiedAltIcon sx={{marginLeft: "13px"}}/>
                            <div style={{width: "100%"}}>
                                <CommentBox value={comment} onChange={handleComment} placeholder='Add a comment...'/>
                            </div>
                            <div style={{marginLeft: "auto", marginRight: "13px"}}>
                                <Send onClick={() => dispatch(commentActions.addCommentDB(props.postid, comment))}><b>Post</b></Send>
                            </div>
                        </CommentWrite>
                </PostContent>
                </Box>
            </Modal>
    )
}

const Delete = styled('button') ({
border: "0px",
background: "transparent",
color: "Red",
"&:hover":{
    cursor: "pointer"
},
margin: "0px 16px 0px auto"
})

const Send = styled('button') ({
border: "0px",
background: "transparent",
color: "#0095f6",
'&:hover':{
    cursor: "pointer",
    opacity: "80%"
}
})

const CommentDate = styled('span') ({
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
backgroundSize: "32px"
})

const Commentname = styled('p') ({
fontSize: "14px",
fontWeight: "500",
marginLeft: "13px"
})

const CommentBox = styled('input') ({
border: "0px",
height: "30px",
marginLeft: "13px",
width: "90%"
})

const CommentWrite = styled('div') ({
height: "53px",
borderTop: "1px solid #e2e2e1",
display: "inline-flex",
alignItems: "center",
width: "100%"
})


export default PostDetail;