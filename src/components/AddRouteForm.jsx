import { useState } from 'react';
import { TextField, Button, Grid, Typography} from '@mui/material';

const AddRouteForm = () => {
  const [routeName, setRouteName] = useState('');
  const [duration, setDuration] = useState(1);
  const [distance, setDistance] = useState(1);

  const [stops, setStops] = useState([]);

  const handleAddStop = () => {
    // Thêm điểm dừng mới vào danh sách stops
    const newStop = { name: '', location: '' };
    setStops([...stops, newStop]);
  };

  const handleStopChange = (index, field, value) => {
    // Cập nhật thông tin của điểm dừng tại vị trí index
    const updatedStops = [...stops];
    updatedStops[index][field] = value;
    setStops(updatedStops);
  };

  const handleSubmit = () => {
    // Xử lý logic khi submit form (ví dụ: gửi request lên server để lưu dữ liệu)
    console.log('Đã submit:', { routeName, duration, distance, stops });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Thêm mới Tuyến đường</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Tên Tuyến đường"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Tổng thời gian đi (hours)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Khoảng cách (km)"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
      </Grid>
      {stops.map((stop, index) => (
        <Grid key={index} container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Tên Điểm dừng"
              value={stop.name}
              onChange={(e) => handleStopChange(index, 'name', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Vị trí (latitude, longitude)"
              value={stop.location}
              onChange={(e) => handleStopChange(index, 'location', e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleAddStop}>
          Thêm Điểm dừng
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Lưu
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddRouteForm;
