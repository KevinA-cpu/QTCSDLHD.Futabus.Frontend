// src/components/LandingPage.js
import { Typography, Button, Container, Box, Grid, Paper, Card, CardContent, CardMedia, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 400,
    },
  },
});

const LandingPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        {/* Banner Section */}
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h1" gutterBottom>
            Hệ Thống Đặt Vé Xe Futabus
          </Typography>
          <Typography variant="h2" gutterBottom>
            Nhanh chóng, Tiện lợi, An toàn
          </Typography>
        </Box>

        {/* Features Section */}
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom>
                Đặt Vé Dễ Dàng
              </Typography>
              <Typography>
                Chỉ với vài bước đơn giản, bạn đã có thể đặt vé xe một cách nhanh chóng.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom>
                Thanh Toán An Toàn
              </Typography>
              <Typography>
                Hỗ trợ nhiều phương thức thanh toán an toàn và tiện lợi.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom>
                Hỗ Trợ 24/7
              </Typography>
              <Typography>
                Đội ngũ hỗ trợ khách hàng luôn sẵn sàng 24/7 để giúp đỡ bạn.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Customer Reviews Section */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" align="center" gutterBottom p={3}>
            Đánh giá của khách hàng
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="250"
                  image="https://images.pexels.com/photos/7245323/pexels-photo-7245323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Customer"
                />
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ marginBottom: 2}}>
                    Lý Bằng
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  "Dịch vụ Futabus rất tuyệt vời! Xe luôn đúng giờ và nhân viên rất thân thiện, nhiệt tình."
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="250"
                  image="https://media.istockphoto.com/id/1446043855/photo/black-woman-on-road-enjoying-window-view-of-desert-and-traveling-in-jeep-on-holiday-road-trip.jpg?b=1&s=612x612&w=0&k=20&c=_7aLPcUUN1sMMmIUpPPI4BshWkwn5MQuI9FFEHswy34="
                  alt="Customer"
                />
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ marginBottom: 2}}>
                    Rota
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                   "Chuyến đi với Futabus rất thoải mái, ghế ngồi êm ái và sạch sẽ. Mình rất hài lòng với chất lượng dịch vụ."
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="250"
                  image="https://media.istockphoto.com/id/1335352624/photo/good-humored-couples-enjoy-memorable-moments-together-in-a-tuk-tuk.jpg?b=1&s=612x612&w=0&k=20&c=wYjg9ByBdbqAzLOPjr51zMz3q6jD4czMUGbnT1G_L8o="
                  alt="Customer"
                />
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ marginBottom: 2}}>
                    Hoàng Minh Huy
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  "Futabus đã đem đến cho tôi một trải nghiệm di chuyển an toàn và nhanh chóng. Giá vé hợp lý và nhiều tiện ích."
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="250"
                  image="https://images.pexels.com/photos/1260580/pexels-photo-1260580.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Customer"
                />
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ marginBottom: 2}}>
                    Hoàng Mạnh Cường
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  "Futabus làm mình cảm thấy rất an tâm khi di chuyển. Lái xe cẩn thận, chuyên nghiệp và có hỗ trợ khách hàng tốt."
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="250"
                  image="https://images.pexels.com/photos/5665999/pexels-photo-5665999.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Customer"
                />
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ marginBottom: 2}}>
                    Trinh Hiệp
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  "Futabus đã đem đến cho tôi một trải nghiệm di chuyển an toàn và nhanh chóng. Giá vé hợp lý và nhiều tiện ích."
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Contact Section */}
        <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom>
            Liên hệ với chúng tôi
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              label="Họ và tên"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Nội dung"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" fullWidth>
              Gửi
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LandingPage;
