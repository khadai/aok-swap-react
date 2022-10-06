import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00665E',
            dark: '#003B34',
            light: '#42948B',
            contrastText: '#fff',
        },
        warning: {
            main: '#FFBB00',
        },
        divider: '#F5F5F5',
        grey: {
            400: '#E0E0E0',
            500: '#BDBDBD',
            600: '#9E9E9E',
            700: '#757575',
            800: '#616161',
            900: '#424242',
        },
    },
    typography: {
        fontFamily: 'Titillium Web, Lora, sans-serif',
        h5: {
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '40px',
            letterSpacing: '0.002em',
        },
        h4: {
            fontWeight: 400,
            fontSize: '34px',
        },
        h3: {
            fontWeight: 500,
            lineHeight: '72px',
        },
        h6: {
            fontSize: '20px',
        },
        button: {
            fontWeight: 400,
            fontSize: '16px',
            textTransform: 'none',
        },
        body1: {
            fontStyle: 'normal',
            fontWeight: 'normal',
            lineHeight: '24px',
            letterSpacing: '0.005em',
        },
        caption: { fontSize: '12px', fontWeight: 400, lineHeight: '12px', letterSpacing: '0.004em' },
    },
});

theme.components = {
    ...theme.components,
    MuiButton: {
        variants: [
            {
                props: { variant: 'contained' },
                style: {
                    boxShadow: 'none',
                    borderRadius: '2px',
                    disableElevation: true,
                },
            },
            {
                props: { variant: 'outlined' },
                style: {
                    boxShadow: 'none',
                    borderRadius: '2px',
                },
            },
        ],
    },
    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                '& fieldset': {
                    borderColor: theme.palette.divider,
                },
            },
        },
    },
    MuiAvatar: {
        styleOverrides: {
            colorDefault: {
                color: theme.palette.grey['600'],
                backgroundColor: theme.palette.grey['100'],
            },
        },
    },
};

export default theme;
