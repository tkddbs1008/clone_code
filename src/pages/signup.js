import React from 'react';

import {useNavigate} from 'react-router-dom'

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

    const nav = useNavigate();

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


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
                        <TextInput label="ID" variant="filled"/>
                    </Div>
                    <Div>
                        <TextInput label="Nickname" variant="filled"/>
                    </Div>
                    <Div>
                        <TextInput label="Password" variant="filled" type="password"/>
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
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </Div>
                    <Div>
                        <Button sx={{width: "270px", height: "30px", textTransform: "none"}} variant="contained" >Sign up</Button>
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