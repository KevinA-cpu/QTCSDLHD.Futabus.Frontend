import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Button,
  Stack,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Joi from 'joi';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';

const updateApplication = async ({ id, data }) => {
  const res = await axios.put(
    `${import.meta.env.VITE_API_URL}/api/applications/${id}`,
    data
  );
  return res.data;
};

const fetchApplication = async (phoneNumber, code) => {
  const res = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/api/applications/single?phoneNumber=${phoneNumber}&code=${code}`
  );
  return res.data;
};

const schema = Joi.object({
  _id: Joi.string().optional(),
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

const fetchApplicationsbWithPhoneNumberAndIdCard = async (
  phoneNumber,
  idCard
) => {
  const res = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/api/applications?phoneNumber=${phoneNumber}&idCard=${idCard}`
  );
  return res.data;
};

const JobLayout = () => {
  const queryClient = useQueryClient();
  const [resultDialog, setResultDialog] = React.useState(false);
  const [updateDialog, setUpdateDialog] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [idCard, setIdCard] = React.useState('');
  const [code, setCode] = React.useState('');
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });
  const { data, refetch } = useQuery(
    ['application', phoneNumber, idCard],
    () => fetchApplicationsbWithPhoneNumberAndIdCard(phoneNumber, idCard),
    {
      enabled: false,
    }
  );

  const { data: applicationData, refetch: refetchApplication } = useQuery(
    ['application', phoneNumber, code],
    () => fetchApplication(phoneNumber, code),
    {
      enabled: false,
    }
  );

  const { mutateAsync } = useMutation(updateApplication);

  const handleSearchWithCodeAndPhoneNumber = async () => {
    await refetchApplication();
  };

  useEffect(() => {
    if (applicationData && applicationData.details) {
      Object.keys(applicationData.details).forEach((key) => {
        if (key === 'birthDate') {
          setValue(key, new Date(applicationData.details[key]));
        } else {
          setValue(key, applicationData.details[key]);
        }
      });
      setValue('_id', applicationData.id);
    }
  }, [handleSearchWithCodeAndPhoneNumber]);

  const onSubmit = async (data) => {
    await mutateAsync({ id: data._id, data });
    queryClient.invalidateQueries(['application', phoneNumber, code]);
    handleClose();
  };

  const handleOpenResultDialog = async () => {
    await refetch();
    setResultDialog(true);
  };

  const handleCloseResultDialog = () => {
    setResultDialog(false);
  };

  const handleOpenDialog = () => {
    setUpdateDialog(true);
  };

  const handleClose = () => {
    queryClient.setQueryData(['application', phoneNumber, code], undefined);
    setUpdateDialog(false);
    reset();
  };

  return (
    <Stack width={'100%'} paddingTop={1}>
      <Stack>
        <Typography variant="h5">Tra cứu kết quả ứng tuyển</Typography>
        <Stack flexDirection={'row'} justifyContent={'space-between'}>
          <Stack flexDirection={'row'} gap={2} marginTop={1}>
            <TextField
              id="outlined-basic"
              label="Số điện thoại"
              variant="outlined"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="CMND/CCCD"
              variant="outlined"
              onChange={(e) => {
                setIdCard(e.target.value);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenResultDialog}
            >
              Tìm kiếm
            </Button>
          </Stack>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
          >
            Thay đổi hồ sơ
          </Button>
        </Stack>
      </Stack>
      <Outlet />
      <Dialog
        open={resultDialog}
        onClose={handleCloseResultDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Kết quả ứng tuyển</DialogTitle>
        <DialogContent>
          {data && data.length > 0 ? (
            data.map((item) => (
              <Stack key={item._id} marginBottom={2}>
                <Typography>Tên công việc: {item.jobName}</Typography>
                <Typography>
                  Ngày ứng tuyển: {new Date(item.createdAt).toLocaleString()}
                </Typography>
                <Typography>Trạng thái: {item.status}</Typography>
              </Stack>
            ))
          ) : (
            <Typography>Không có kết quả</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResultDialog} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={updateDialog} onClose={handleClose}>
        <DialogTitle>Thông tin hồ sơ</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Stack gap={2} marginBottom={2} flexDirection={'row'}>
              <TextField
                id="outlined-basic"
                label="Số điện thoại"
                variant="outlined"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Mã ứng tuyển"
                variant="outlined"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearchWithCodeAndPhoneNumber}
              >
                Tìm kiếm
              </Button>
            </Stack>

            {applicationData && (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Stack spacing={2}>
                    <Controller
                      name="fullName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          label="Họ và tên"
                          {...field}
                          error={!!errors.fullName}
                          helperText={errors.fullName?.message}
                          variant="outlined"
                        />
                      )}
                    />
                    <Controller
                      name="idNumber"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          label="Số CMND/CCCD"
                          variant="outlined"
                          {...field}
                          error={!!errors.idNumber}
                          helperText={errors.idNumber?.message}
                        />
                      )}
                    />

                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          label="Số điện thoại"
                          variant="outlined"
                          {...field}
                          error={!!errors.phoneNumber}
                          helperText={errors.phoneNumber?.message}
                        />
                      )}
                    />

                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          label="Email"
                          variant="outlined"
                          {...field}
                          error={!!errors.email}
                          helperText={errors.email?.message}
                        />
                      )}
                    />

                    <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          label="Thành Phố đang sinh sống"
                          variant="outlined"
                          {...field}
                          error={!!errors.city}
                          helperText={errors.city?.message}
                        />
                      )}
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
                      render={({ field }) => (
                        <DatePicker
                          label="Ngày sinh"
                          inputFormat="dd/MM/yyyy"
                          {...field}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      )}
                    />

                    <Controller
                      name="educationLevel"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          label="Trình Độ Học vấn"
                          variant="outlined"
                          {...field}
                          error={!!errors.educationLevel}
                          helperText={errors.educationLevel?.message}
                        />
                      )}
                    />
                    <Controller
                      name="district"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          label="Quận đang sinh sống"
                          variant="outlined"
                          {...field}
                          error={!!errors.district}
                          helperText={errors.district?.message}
                        />
                      )}
                    />
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          label="Địa chỉ"
                          variant="outlined"
                          {...field}
                          error={!!errors.address}
                          helperText={errors.address?.message}
                        />
                      )}
                    />

                    <Controller
                      name="introduction"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          label="Giới thiệu"
                          variant="outlined"
                          multiline
                          minRows={3}
                          {...field}
                        />
                      )}
                    />
                  </Stack>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Hủy
            </Button>
            <Button type="submit">Cập nhật</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Stack>
  );
};

export default JobLayout;
