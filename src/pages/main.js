import React from "react";
import Header from "../Shared/header";
// import Post from "../components/Post";

import { actionCreators as postActions } from "../redux/modules/post";

import Post from "../components/post";
import { useDispatch, useSelector } from "react-redux";

const Main = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list)

    React.useEffect(() => {
        dispatch(postActions.getPostDB())
    }, [])

    if(!post_list){
        return;
    }

  return (
    <React.Fragment>
      <Header />
      {post_list.map((el,idx) => {
          return (
                <Post key={el.postid} {...el}/>
          )
      })}
    </React.Fragment>
  );
};



export default Main;