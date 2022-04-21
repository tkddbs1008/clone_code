import React from "react";
import Header from "../Shared/header";

// MUI
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionsCreators as imageActions } from "../redux/modules/image";
const ProfileEdit = (props) => {

    const user_data = useSelector((state) => state.user.user)
    const dispatch = useDispatch();
    const token = document.cookie.split("=")[1];
    const [ImgFile, setImgFile] = React.useState('')

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
    const Send = () => {
        dispatch(userActions.changeProfileDB(ImgFile, token))
    }

    React.useEffect(() => {
      dispatch(userActions.loginCheck())
    }, [])

    return (
      <React.Fragment>
        <Header />
        <header style={{ display: "flex", width: "696px", height: "200px", margin: "auto", padding: "16px" }}>
          <div style={{display: "flex", height: "42px"}}>
            {!preview ?
            <div>
              <ProfileImg style={{backgroundImage: `url(${user_data?.profilePic})`, backgroundSize: "cover"}}/>
            </div>
            :
            <div>
              <ProfileImg style={{backgroundImage: `url(${preview})`, backgroundSize: "38px"}}/>
            </div>
           }
            <div style={{width: "137px", height: "18px"}} >
              <p style={{margin: "0px 0px 0px 6px", }}>{user_data?.nickname}</p>
              <input
                type="file"
                onChange={selectFile}
                ref={hidden}
                id="fileUpload"
                accept="image/jpeg, image/png, image/jpg"
                style={{ display: "none" }}
              />
              <Submit onClick={handleClick}>Change Profile Photo</Submit>
            </div>
          </div>
      </header>
      <div style={{display: "flex", width: "696px", height: "200px", margin: "auto", padding: "16px"}} >
        <div>
        <Button variant="contained" onClick={Send}>제출</Button>
        </div>
      </div>
    </React.Fragment>
  );
};
const Submit = styled('button') ({
width: "137px",
height: "18px",
padding: "0px",
color: "#0095f6",
backgroundColor: "transparent",
border: "0px",
'&:hover': {
    cursor: "pointer"
},
'&:active': {
    opacity: "0.7"
}
})

const ProfileImg = styled("div")({
  width: "38px",
  height: "38px",
  background: "#62676A",
  borderRadius: "19px",
});

export default ProfileEdit;