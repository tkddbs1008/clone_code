import React from "react";
import Header from "../Shared/header";
// import Post from "../components/Post";

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";
import Post from "../components/post";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import InfinityScroll from "../components/infinityScroll";
import Spinner from "../elements/Spinner";

const Main = (props) => {
    const dispatch = useDispatch();
    const is_loading = useSelector((state) => state.post.is_loading);
    const post_list = useSelector((state) => state.post.list)

    React.useEffect(() => {
      dispatch(userActions.loginCheck())
    }, [])

    React.useEffect(() => {
      if(post_list.length === 0){
        dispatch(postActions.getPostDB(0))
      }
    }, [])

    if(!post_list){
        return <Spinner/>
    }

  return (
    <React.Fragment>
      <Header />
      <InfinityScroll
        callNext={() => dispatch(postActions.getPostDB())}
        is_next={post_list.length ? true : false}
        loading={is_loading}
      >
        {post_list.map((el,idx) => {
            return (
                  <Post key={idx} {...el}/>
            )
        })}
      </InfinityScroll>
    </React.Fragment>
  );
};



export default Main;