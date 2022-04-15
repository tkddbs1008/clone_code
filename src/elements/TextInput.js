import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';



const TextInput = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
  ))(({ theme }) => ({
    '& .MuiFilledInput-root': {
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 4,
      width: "270px",
      height: "38px",
      backgroundColor: 'transparent',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&.Mui-focused': {
        backgroundColor: 'transparent',
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
    '& label': {
      fontSize: "10px",
      "&.Mui-focused": {
        fontSize: "10px"
      }
    },

  }));


export default TextInput;