import { Box, Typography, Link, Divider } from '@mui/material';
import { Call, LocationOn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: 'primary.main', color: 'white' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1rem',
            marginTop: '1rem',
          }}
        >
          <Typography variant="h6">Về chúng tôi</Typography>
          <Link href="#" color="inherit" underline="none">
            Giới thiệu công ty
          </Link>
        </Box>
        <Divider orientation="vertical" flexItem />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1rem',
            marginTop: '1rem',
          }}
        >
          <Typography variant="h6">Thông tin</Typography>
          <Link href="/tuyen-dung" color="inherit" underline="none">
            Tuyển dụng
          </Link>

          <Link href="#" color="inherit" underline="none">
            Thông tin chính sách
          </Link>
          <Divider orientation="vertical" flexItem />
        </Box>
        <Divider orientation="vertical" flexItem />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1rem',
            marginTop: '1rem',
          }}
        >
          <Typography variant="h6">Địa chỉ</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LocationOn />
            <Link href="#" color="inherit" underline="none">
              Tòa nhà 1
            </Link>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LocationOn />
            <Link href="#" color="inherit" underline="none">
              Tòa nhà 2
            </Link>
          </Box>
          <Divider orientation="vertical" flexItem />
        </Box>
        <Divider orientation="vertical" flexItem />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1rem',
            marginTop: '1rem',
          }}
        >
          <Typography variant="h6">Liên hệ</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Call />
            <Link href="#" color="inherit" underline="none">
              0123456789
            </Link>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Call />
            <Link href="#" color="inherit" underline="none">
              0123456789
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
