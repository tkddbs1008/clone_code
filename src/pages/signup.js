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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';


const Signup = (props) => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    //data useState
    const [ID, setID] = React.useState('')
    const [Nickname, setNickname] = React.useState('')
    const [PWD, setPWD] = React.useState('')
    const [Check, setCheck] = React.useState({
        password: '',
        showPassword: false,
    });

    //data status
    const [idCheck, setidCheck] = React.useState(false);
    const [nameCheck, setnameCheck] = React.useState(false);
    const [pwdCheck, setpwdCheck] = React.useState(false);

    const handleChange = (prop) => (event) => {
        setCheck({ ...Check, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setCheck({
            ...Check,
            showPassword: !Check.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const IdCheck = (e) => {
        const regExp = /^[A-Za-z]{1}[A-Za-z0-9_-]{3,19}$/
        setID(e.target.value)
        setidCheck(regExp.test(e.target.value))
    }
    const nicknameCheck = (e) => {
        const regExp = /^[가-힣a-zA-Z].{3,}$/
        setNickname(e.target.value)
        setnameCheck(regExp.test(e.target.value))
    }
    const passwordCheck = (e) => {
        const regExp = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,}$/
        setPWD(e.target.value)
        setpwdCheck(regExp.test(e.target.value))
    }
    const SignUp = () => {
        dispatch(userActions.registerDB(ID, Nickname, PWD))
    }
    return (
        <Boxx>
            <Card sx={{border: "1px solid #e2e2e1", borderRadius: "0px"}}>
                <CardContent sx={{padding: "0px"}}>
                    <ImageButton>
                        <ImageSrc onClick={() => nav('/')}/>
                    </ImageButton>
                    <Div>
                        <Side>
                        Sign up to see photos and videos from your friends.
                        </Side>
                    </Div>
                    <Div>
                        {idCheck === true ?
                        <TextInput label="ID" variant="filled" value={ID} onChange={IdCheck}/>
                        :
                        <TextInput label="ID" variant="filled" value={ID} error onChange={IdCheck}/>
                        }
                    </Div>
                    <Div>
                        {nameCheck === true?
                        <TextInput label="Nickname" variant="filled" value={Nickname} onChange={nicknameCheck}/>
                        :
                        <TextInput label="Nickname" variant="filled" value={Nickname} error onChange={nicknameCheck}/>
                        }
                    </Div>
                    <Div>
                        {pwdCheck === true?
                        <TextInput label="Password" variant="filled" type="password" value={PWD}  onChange={passwordCheck}/>
                        :
                        <TextInput label="Password" variant="filled" type="password" value={PWD} error onChange={passwordCheck}/>
                        }
                    </Div>
                    <Div>
                        <FormControl variant="filled">
                            <InputLabel>Password Check</InputLabel>
                            <FilledInput
                                sx={{height: "38px", width: "270px", disableUnderline: "true" , backgroundColor: "transparent", border: "1px solid #e2e2e1",
                                '&:hover': {
                                    backgroundColor: "transparent"
                                },
                                "& Mui-focused": {
                                    backgroundColor: "transparent"
                                },
                                    }}
                                type={Check.showPassword ? 'text' : 'password'}
                                value={Check.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {Check.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </Div>
                    <Div>
                        {PWD === Check.password && pwdCheck === true ?
                        <Button sx={{width: "270px", height: "30px", textTransform: "none"}} variant="contained" onClick={SignUp}>Sign up</Button>
                        :
                        <Button sx={{width: "270px", height: "30px", textTransform: "none"}} variant="contained" disabled onClick={SignUp}>Sign up</Button>
                        }
                    </Div>
                </CardContent>
            </Card>
        </Boxx>
    )
}

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
marginTop: "20px",
marginBottom: "20px",
})

const Side = styled('p') ({
textAlign: "center",
fontSize: "17px",
color: "#8E8E8E",
fontWeight: "600",
margin: "0px 40px 10px"
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



export default Signup;