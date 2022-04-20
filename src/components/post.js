import React from "react";

//components
import PostDetail from "./PostDetail";
import Image from "../elements/Image";

//
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
//
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineTwoToneIcon from "@mui/icons-material/ChatBubbleOutlineTwoTone";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import BookmarkBorderTwoToneIcon from "@mui/icons-material/BookmarkBorderTwoTone";
import IconButton from "@mui/material/IconButton";
import Checkbox from '@mui/material/Checkbox';

const Post = (props) => {
    const dispatch = useDispatch();
    const [checked, setChecked] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const detailOpen = () => {
      setOpen(true);
    }
    const handleChange = (e) => {
    setChecked(e.target.checked);
    };

    if(!props){
      return;
    }

    return (
        <Boxx>
        <Card sx={{ border: "1px solid #e2e2e1", borderRadius: "0px" }}>
          <div>
            <PostHeader>
              <CommentImg style={{backgroundImage: `url(${props.userResponseDto.profile})`}}/>
              <Commentname>{props?.userResponseDto?.nickname}</Commentname>
              <IconButton sx={{ marginLeft: "auto", marginRight: "13px" }}>
                <MoreHorizIcon />
              </IconButton>
            </PostHeader>
          </div>
          <div>
            <Image
              shape="rectangle"
              src={props.imageUrl}
            />
          </div>
          <div>
            <MiddleButtons>
              {/* {props.myLike ?
              <Checkbox icon={<Favorite />} checkedIcon={<FavoriteBorder />} />
              :
              <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
              } */}
              {props.myLike ?
                <IconButton onClick={() => dispatch(postActions.unfavPost(props.postid))}>
                  <Favorite/>
                </IconButton>
              :
              <IconButton onClick={()=> dispatch(postActions.favPost(props.postid))}>
                <FavoriteBorder/>
              </IconButton>
              }
              <IconButton onClick={detailOpen}>
                <ChatBubbleOutlineTwoToneIcon />
              </IconButton>
              <IconButton>
                <SendTwoToneIcon />
              </IconButton>
              <IconButton sx={{ marginLeft: "auto", marginRight: "13px" }}>
                <BookmarkBorderTwoToneIcon />
              </IconButton>
            </MiddleButtons>
          </div>
          <div>
            {/* <LikeUsers>
              <strong>{props.userResponseDto.nickname}</strong>님 <strong>외 1명</strong>이 좋아합니다.
            </LikeUsers> */}
          </div>
          <div style={{padding: "12px"}}>
            <div>
              <LikeUsers>
                <strong>{props.userResponseDto.nickname}</strong>   {props.content}
              </LikeUsers>
            </div>
            <div>
              {props.comments.length > 0 ?
              <MoreComment>댓글 {props.comments.length}개 모두 보기</MoreComment>
              :
              null
              }
            </div>
            <div>
              <PostDate>{props.timeBefore}</PostDate>
            </div>
          </div>
        </Card>
        <PostDetail {...props} open={open} setOpen={setOpen} handleClose={handleClose}/>
      </Boxx>
    )
}


const Boxx = styled(Box)({
    width: "614px",
    margin: "auto",
    marginTop: "24px",
  });

  const CommentImg = styled("div")({
    width: "32px",
    height: "32px",
    background: "grey",
    borderRadius: "16px",
    marginLeft: "13px",
    backgroundSize: "32px"
  });

  const PostHeader = styled("div")({
    width: "100%",
    height: "60px",
    borderBottom: "1px solid #e2e2e1",
    display: "flex",
    alignItems: "center",
  });

  const Commentname = styled("p")({
    fontSize: "14px",
    fontWeight: "500",
    marginLeft: "13px",
  });

  const PostDate = styled("p")({
    fontSize: "12px",
    color: "#B7BBBD",
    padding: "0px",
    margin: "0px",
    marginTop: "10px",
  });

  const MoreComment = styled("p")({
    fontSize: "14px",
    color: "#B7BBBD",
    padding: "0px",
    margin: "0px",
    marginTop: "10px",
  });

  const LikeUsers = styled("p")({
    fontSize: "14px",
  });

  const MiddleButtons = styled("div")({
    width: "100%",
    height: "40px",
    display: "flex",
    alignItems: "center",
  });

export default Post;