import React from "react";
import Header from "../Shared/header";
// import Post from "../components/Post";

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";
import Post from "../components/post";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

const Main = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list)
    // const [isLoaded, setIsLoading] = React.useState(false);
    // const [target, setTarget] = React.useState(null)
    // const [postlist, setPostList] = React.useState(0)
    React.useEffect(() => {
      dispatch(userActions.loginCheck())
    }, [])

    // const onIntersect = async ([entry], observer) => {
    // if (entry.isIntersecting && !isLoaded) {
    //   observer.unobserve(entry.target);
    //   setIsLoading(true);
    //   setPostList(post_list.length)
    //   setIsLoading(false);
    //   observer.observe(entry.target);
    // }
    // };

    // React.useEffect(() => {
    // let observer;
    // if (target) {
    //   observer = new IntersectionObserver(onIntersect, {
    //     threshold: 1,
    //   });
    //   observer.observe(target);
    // }
    // return () => observer && observer.disconnect();
    // }, [target]);

    React.useEffect(() => {
      dispatch(postActions.getPostDB(post_list.length))
    }, [])

    if(!post_list){
        return;
    }

  return (
    <React.Fragment>
      <Header />
      {post_list.map((el,idx) => {
          return (
                <Post key={el.idx} {...el}/>
          )
      })}
      {/* <div ref={setTarget} className="Target-Element">
          {isLoaded && <Loader />}
      </div> */}
    </React.Fragment>
  );
};



export default Main;