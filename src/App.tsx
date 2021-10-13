import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import theme from './styles/theme';
import HomePage from './components/HomePage';

function App() {
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
