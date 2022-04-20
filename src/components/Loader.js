import React from 'react';
import ReactLoading from "react-loading";
import { styled } from "@mui/system";


const Loader = (props) => {
    return(
    <LoaderWrap>
      <ReactLoading type="spin" color="#A593E0" />
    </LoaderWrap>
    )
}

const LoaderWrap = styled('div') ({
width: "100%",
height: "80%",
display: "flex",
justifyContent: "center",
textAlign: "center",
alignItems: "center",
})



export default Loader;