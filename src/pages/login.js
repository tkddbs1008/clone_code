import React from 'react';

import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {actionCreators as userActions} from '../redux/modules/user'
//element
import TextInput from '../elements/TextInput'

//MUI
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';


const Login = (props) => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [ID, setID] = React.useState('')
    const [PWD, setPWD] = React.useState('')

    const handleID = (e) => {
        setID(e.target.value);
    };
     const handlePWD = (e) => {
        setPWD(e.target.value);
    };

    const SignIn = () => {
        dispatch(userActions.loginDB(ID, PWD))
    }
    return (
        <Boxx>
            <Card sx={{border: "1px solid #e2e2e1", borderRadius: "0px"}}>
                <CardContent sx={{padding: "0px"}}>
                    <ImageButton>
                        <ImageSrc onClick={() => nav('/')}/>
                    </ImageButton>
                    <Div>
                        <TextInput label="ID" variant="filled" value={ID} onChange={handleID}/>
                    </Div>
                    <Div>
                        <TextInput label="Password" variant="filled" type="password" value={PWD} onChange={handlePWD}/>
                    </Div>
                    <Div>
                        <Button sx={{width: "270px", height: "30px", textTransform: "none"}} variant="contained" onClick={SignIn}>Log in</Button>
                    </Div>
                </CardContent>
            </Card>
            <Card sx={{border: "1px solid #e2e2e1", borderRadius: "0px", marginTop: "13px"}}>
                <div style={{textAlign: "center", display: "flex", justifyContent: "center",}}>
                    <p>Don't have an account?</p>
                    <Signup onClick={() => nav('/signup')}>Sign up</Signup>
                </div>
            </Card>
        </Boxx>
    )
}

const Signup = styled('button') ({
border: "0px",
backgroundColor: "transparent",
color: "#0095f6",
fontWeight: "600",
height: "21px",
alignSelf: "center",
'&:hover': {
    cursor: "pointer",
}
})

const Boxx = styled(Box) ({
width: "350px",
margin: "auto",
marginTop: "7%"
})

const Div = styled('div') ({
height: "46px",
width: "348",
alignItems: "center",
display: "flex",
justifyContent: "center",
})

const ImageButton = styled(ButtonBase) ({
width: "175px",
height: "51px",
margin: "auto",
display: "flex",
marginTop: "40px",
marginBottom: "30px",
})

const ImageSrc = styled('span')({
position: 'absolute',
left: 0,
right: 0,
top: 0,
bottom: 0,
backgroundSize: 'cover',
backgroundPosition: 'center',
backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png)`
});

export default Login;