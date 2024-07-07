import { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const AddRouteForm = () => {
  const navigate = useNavigate();
  const [routeName, setRouteName] = useState('');
  const [duration, setDuration] = useState(1);
  const [distance, setDistance] = useState(1);

  const [stops, setStops] = useState([]);

  const handleAddStop = () => {
    // Thêm điểm dừng mới vào danh sách stops
    const newStop = { name: '', location: '', facilities: '' };
    setStops([...stops, newStop]);
  };

  const handleStopChange = (index, field, value) => {
    // Cập nhật thông tin của điểm dừng tại vị trí index
    const updatedStops = [...stops];
    updatedStops[index][field] = value;
    setStops(updatedStops);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Đã submit:', { routeName, duration, distance, stops });
      const res = await axios.post('https://localhost:7076/api/route/add-new-with-stops', { routeName, duration, distance, stops });
      alert(res.data);
      navigate("/futabus-routes");
    } catch (error) {
      alert(error);
      console.error('Error submitting data:', error);
    }
  };

  return (
    <Paper elevation={1}>
      <Grid container spacing={2} p={5} marginBottom={2}>
        <Grid item xs={12}>
          <Typography variant="h5" align='center'>Thêm Mới Tuyến Đường</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Tên Tuyến đường"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
            sx={{marginTop: 3}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Tổng thời gian đi (hours)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            sx={{marginTop: 3}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Khoảng cách (km)"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            sx={{marginTop: 3}}
          />
        </Grid>
        {stops.map((stop, index) => (
          <Grid key={index} container item xs={12} spacing={3} sx={{marginTop: 2}}>
            <Grid item xs={4} >
              <TextField
                required
                fullWidth
                label="Tên Điểm dừng"
                value={stop.name}
                onChange={(e) => handleStopChange(index, 'name', e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                fullWidth
                label="Vị trí (latitude, longitude)"
                value={stop.location}
                onChange={(e) => handleStopChange(index, 'location', e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                fullWidth
                label="Tiện ích (facilities)"
                value={stop.facilities}
                onChange={(e) => handleStopChange(index, 'facilities', e.target.value)}
              />
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleAddStop} sx={{marginTop: 2, marginBottom: 2}}>
            Thêm Điểm dừng <AddIcon />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
            Tạo tuyến đường
          </Button>
        </Grid>
      </Grid>
    </Paper>

  );
};

export default AddRouteForm;
