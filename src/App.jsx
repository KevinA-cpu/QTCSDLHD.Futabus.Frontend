import { CssBaseline, Box, Container } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <Header />
        <Container>
          <Box style={{ flexGrow: 1, display: 'flex' }}>
            <Outlet />
          </Box>
        </Container>
        <footer>
            <Footer />
        </footer>
      </Box>
    </>
  );
}

export default App;
