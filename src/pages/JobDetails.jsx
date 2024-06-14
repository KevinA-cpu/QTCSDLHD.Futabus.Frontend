import React from 'react';
import axios from 'axios';
import {
  Typography,
  Stack,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

const fetchJobs = async (id) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`);
  return res.data;
};

const JobDetails = () => {
  const { id } = useParams();
  const [openDialog, setOpenDialog] = React.useState(false);
  const { isLoading, error, data } = useQuery(['job', id], () => fetchJobs(id));

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Stack width={'100%'} paddingY={2}>
      {isLoading && 'Loading...'}
      {error && `An error has occurred: ${error.message}`}
      {data && (
        <>
          <Typography variant="h4" marginBottom={1}>
            {data.name}
          </Typography>
          <Grid container spacing={25} marginBottom={1}>
            <Grid item xs={6} width={500}>
              <Stack spacing={1}>
                <Typography variant="body2">
                  Công ty: {data.companyName}
                </Typography>
                <Typography variant="body2">
                  Nơi làm việc: {data.location}
                </Typography>
                <Typography variant="body2">Lương: {data.salary}</Typography>
                <Typography variant="body2">
                  Hạn chót nhận hồ sơ:{' '}
                  {new Date(data.submissionDeadline).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  Số lượng: {data.details.amount}
                </Typography>
                <Typography variant="body2">
                  Kinh nghiệm: {data.details.experience}
                </Typography>
                <Typography variant="body2">
                  Hình thức: {data.details.form}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <Typography variant="body2">
                  Mô tả: {data.details.description}
                </Typography>
                <Typography variant="body2">
                  Hồ sơ: {data.details.documents}
                </Typography>
                <Typography variant="body2">
                  Liên lạc: {data.details.contacts}
                </Typography>
                <Typography variant="body2">
                  Yêu cầu: {data.details.requirements}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </>
      )}
      <Button onClick={handleOpenDialog} variant="contained" color="primary">
        Ứng tuyển
      </Button>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Thông tin hồ sơ</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Stack spacing={2}>
                <TextField fullWidth label="Họ và tên" variant="outlined" />
                <TextField fullWidth label="Số CMND/CCCD" variant="outlined" />
                <TextField fullWidth label="Số điện thoại" variant="outlined" />
                <TextField fullWidth label="Email" variant="outlined" />
                <TextField
                  fullWidth
                  label="Thành Phố đang sinh sống"
                  variant="outlined"
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <InputLabel id="gender">Giới tính</InputLabel>
                  <Select id="select" labelId="gender" label="Giới tính">
                    <MenuItem value={'Nam'}>Nam</MenuItem>
                    <MenuItem value={'Nữ'}>Nữ</MenuItem>
                  </Select>
                </FormControl>

                <DatePicker
                  label="Ngày sinh"
                  inputFormat="dd/MM/yyyy"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Trình Độ Học vấn"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Quận đang sinh sống"
                  variant="outlined"
                />
                <TextField fullWidth label="Địa chỉ" variant="outlined" />
                <TextField
                  fullWidth
                  label="Giới thiệu"
                  variant="outlined"
                  multiline
                  minRows={3}
                />
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Hủy
          </Button>
          <Button onClick={handleClose}>Nộp</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default JobDetails;
