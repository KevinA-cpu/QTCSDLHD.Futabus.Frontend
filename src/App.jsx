import { CssBaseline, Container, Box, Typography } from '@mui/material';
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
      <Container
        sx={{
          display: 'flex',
          minHeight: '100vh',
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <Header />

        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <main>
            <Outlet />
          </main>
        </Box>

        <footer>
          <Footer />
        </footer>
      </Container>
    </>
  );
}

export default App;
