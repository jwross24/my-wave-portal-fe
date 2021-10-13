import {createTheme, responsiveFontSizes} from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#430089',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#82FFA1',
      contrastText: '#000000',
    },
    text: {
      primary: '#242E35',
      secondary: '#646c73',
      disabled: '#C6C9CB',
    },
    background: {
      paper: '#FFFFFF',
      default: '#FAFAFA',
    },
  },
  typography: {
    button: {
      fontWeight: 500,
      fontSize: 15,
      lineHeight: 26 / 15,
      letterSpacing: 0.46,
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
