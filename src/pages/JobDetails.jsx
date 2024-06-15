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
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ChevronLeft } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import Joi from 'joi';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

const fetchJobDetails = async (id) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`);
  return res.data;
};

const submitApplication = async ({ id, jobName, data }) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/applications`,
    { job: id, jobName, details: data }
  );
  return res.data;
};

const schema = Joi.object({
  fullName: Joi.string().required().messages({
    'string.empty': 'Họ và tên không được để trống',
  }),
  idNumber: Joi.string().required().messages({
    'string.empty': 'Số CMND/CCCD không được để trống',
  }),
  phoneNumber: Joi.string().required().messages({
    'string.empty': 'Số điện thoại không được để trống',
  }),
  educationLevel: Joi.string().required().messages({
    'string.empty': 'Trình độ học vấn không được để trống',
  }),
  city: Joi.string().required().messages({
    'string.empty': 'Thành phố không được để trống',
  }),
  district: Joi.string().required().messages({
    'string.empty': 'Quận không được để trống',
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Địa chỉ không được để trống',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': 'Email không hợp lệ',
      'string.empty': 'Email không được để trống',
    }),

  birthDate: Joi.optional(),
  gender: Joi.optional(),
  introduction: Joi.optional(),
});

const JobDetails = () => {
  const { id } = useParams();
  const [code, setCode] = React.useState('');
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });
  const [openDialog, setOpenDialog] = React.useState(false);
  const {
    isLoading,
    error,
    data: jobData,
  } = useQuery(['job', id], () => fetchJobDetails(id));
  const { mutateAsync } = useMutation(submitApplication);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onSubmit = async (data) => {
    const result = await mutateAsync({ id, jobName: jobData.name, data });
    setCode(result.code);
  };

  return (
    <Stack width={'100%'} paddingY={2}>
      <IconButton
        component={Link}
        to="/tuyen-dung"
        sx={{ marginBottom: 1, width: 40 }}
        color="primary"
      >
        <ChevronLeft />
      </IconButton>
      {isLoading && 'Loading...'}
      {error && `An error has occurred: ${error.message}`}
      {jobData && (
        <>
          <Typography variant="h4" marginBottom={1}>
            {jobData.name}
          </Typography>
          <Grid container spacing={25} marginBottom={1}>
            <Grid item xs={6} width={500}>
              <Stack spacing={1}>
                <Typography variant="body2">
                  Công ty: {jobData.companyName}
                </Typography>
                <Typography variant="body2">
                  Nơi làm việc: {jobData.location}
                </Typography>
                <Typography variant="body2">Lương: {jobData.salary}</Typography>
                <Typography variant="body2">
                  Hạn chót nhận hồ sơ:{' '}
                  {new Date(jobData.submissionDeadline).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  Số lượng: {jobData.details.amount}
                </Typography>
                <Typography variant="body2">
                  Kinh nghiệm: {jobData.details.experience}
                </Typography>
                <Typography variant="body2">
                  Hình thức: {jobData.details.form}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <Typography variant="body2">
                  Mô tả: {jobData.details.description}
                </Typography>
                <Typography variant="body2">
                  Hồ sơ: {jobData.details.documents}
                </Typography>
                <Typography variant="body2">
                  Liên lạc: {jobData.details.contacts}
                </Typography>
                <Typography variant="body2">
                  Yêu cầu: {jobData.details.requirements}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Button
            onClick={handleOpenDialog}
            variant="contained"
            color="primary"
          >
            Ứng tuyển
          </Button>
        </>
      )}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Thông tin hồ sơ</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Họ và tên"
                    {...register('fullName')}
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Số CMND/CCCD"
                    variant="outlined"
                    {...register('idNumber')}
                    error={!!errors.idNumber}
                    helperText={errors.idNumber?.message}
                  />
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    variant="outlined"
                    {...register('phoneNumber')}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                  <TextField
                    fullWidth
                    label="Thành Phố đang sinh sống"
                    variant="outlined"
                    {...register('city')}
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={2}>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue={'Nữ'}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="gender-label">Giới tính</InputLabel>
                        <Select
                          {...field}
                          labelId="gender-label"
                          label="Giới tính"
                        >
                          <MenuItem value={'Nam'}>Nam</MenuItem>
                          <MenuItem value={'Nữ'}>Nữ</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="birthDate"
                    control={control}
                    defaultValue={new Date()}
                    render={({ field }) => (
                      <DatePicker
                        label="Ngày sinh"
                        inputFormat="dd/MM/yyyy"
                        {...field}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    )}
                  />
                  <TextField
                    fullWidth
                    label="Trình Độ Học vấn"
                    variant="outlined"
                    {...register('educationLevel')}
                    error={!!errors.educationLevel}
                    helperText={errors.educationLevel?.message}
                  />
                  <TextField
                    fullWidth
                    label="Quận đang sinh sống"
                    variant="outlined"
                    {...register('district')}
                    error={!!errors.district}
                    helperText={errors.district?.message}
                  />
                  <TextField
                    fullWidth
                    label="Địa chỉ"
                    variant="outlined"
                    {...register('address')}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                  <TextField
                    fullWidth
                    label="Giới thiệu"
                    variant="outlined"
                    multiline
                    minRows={3}
                    {...register('introduction')}
                  />
                </Stack>
              </Grid>
            </Grid>

            {code && (
              <Typography textAlign={'center'} marginTop={2}>
                Ghi nhớ mã ứng tuyển: {code}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Hủy
            </Button>
            <Button type="submit">Nộp</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Stack>
  );
};

export default JobDetails;
