import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "12345";
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Futabus © '}
      <Link color="inherit" href="https://futabus.vn/">
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const request = {
      username: data.get('username'),
      password: data.get('password'),
    };

    if (isAdmin) {
      if(request.username == ADMIN_USERNAME && request.password == ADMIN_PASSWORD) {
        alert("Login success!");
        localStorage.setItem('username', request.username);
        localStorage.setItem('role', 'admin');
        navigate(`/futabus-routes`);
      }
      else {
        alert("Invalid username or password!");
      }
    }
    else
    {
      //add logic for login user
      alert("Login with username and password for user role !");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
      <Paper elevation={1}>
        <CssBaseline />
        <Box
          p={5}
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              sx={{
                marginTop: 2,
                marginBottom: 2
              }}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usename"
              name="username"
              autoFocus
            />
            <TextField
              sx={{
                marginTop: 2,
                marginBottom: 2
              }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              sx={{
                marginTop: 2,
                marginBottom: 2
              }}
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              }
              label="Check here if your role is administrator"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright pb={5} sx={{ mt: 2, mb: 2 }} />
      </Paper>
      </Container>
    </ThemeProvider>
  );
}
