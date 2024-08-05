import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Rosetheme = createTheme({
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        borderColor: '#D81730',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#D81730',
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#D81730',
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#D81730',
                    },
                },
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: '#D81730',
                    '&.Mui-checked': {
                        color: '#D81730',
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: '#D81730',
                    '&.Mui-checked': {
                        color: '#D81730',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#D81730',
                    '&:hover': {
                        backgroundColor: '#A01523',
                    },
                    color: '#fff',
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#D81730',
                    '&:hover': {
                        color: '#A01523',
                    },
                },
            },
        },
    },
});

export default function RowRadioButtonsGroup() {
  return (
    <ThemeProvider theme={Rosetheme}>
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="" />
        <FormControlLabel value="male" control={<Radio />} label="" />
        <FormControlLabel value="2" control={<Radio />} label="" />
        <FormControlLabel value="5" control={<Radio />} label="" />
        <FormControlLabel value="8" control={<Radio />} label="" />
      </RadioGroup>
    </FormControl>
    </ThemeProvider>
  );
}
