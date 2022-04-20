import React from "react";
import Header from "../Shared/header";

// MUI
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
const ProfileEdit = (props) => {

    const dispatch = useDispatch();
    const token = document.cookie.split("=")[1];
    const [ImgFile, setImgFile] = React.useState('')

    const selectFile = (e) => {
        setImgFile(e.target.files[0])
    }
    const hidden = React.useRef(null);
    const handleClick = (e) => {
        hidden.current.click();
    }
    const Send = () => {
        dispatch(userActions.changeProfileDB(ImgFile, token))
    }
    return (
      <React.Fragment>
        <Header />
        <header style={{ display: "flex" }}>
          <div>
            <ProfileImg />
          </div>
          <div>
            <grid>
              <h1>Username</h1>
              <div>
                <input
                  type="file"
                  onChange={selectFile}
                  ref={hidden}
                  id="fileUpload"
                  accept="image/jpeg, image/png, image/jpg"
                  style={{ display: "none" }}
                />
                <Submit onClick={handleClick}>Select from computer</Submit>
            </div>
          </grid>
        </div>
      </header>
      <div>
      </div>
      <div>
        <Button variant="contained" onClick={Send}>제출</Button>
      </div>
    </React.Fragment>
  );
};
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

const ProfileImg = styled("div")({
  width: "150px",
  height: "150px",
  background: "#62676A",
  borderRadius: "75px",
});

export default ProfileEdit;