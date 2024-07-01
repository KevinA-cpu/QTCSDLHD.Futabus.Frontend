import { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, MenuItem, Select, InputLabel, Box } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddScheduleForm = () => {
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [busId, setBusId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [buses, setBuses] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const { routeId } = useParams();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('https://localhost:7076/api/route/list-all-buses');
        setBuses(response.data);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchBuses();
  }, []);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('https://localhost:7076/api/route/list-all-driver');
        setDrivers(response.data);
        console.log("cwccccc" ,response.data);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchDrivers();
  }, []);

  const handleDriverChange = (event) => {
    setDriverId(event.target.value);
  };

  const handleBusChange = (event) => {
    setBusId(event.target.value);
  };

  const handleSubmit = () => {
    // Xử lý logic khi submit form (ví dụ: gửi request lên server để lưu dữ liệu)
    console.log('Đã submit:', { routeId, departureTime, arrivalTime, busId, driverId });
  };

  return (

  <Box sx={{
      width: '100%',
      overflowX: 'auto',
      padding: '2rem',
      marginTop: '1rem',
      marginBottom: '1rem',
      borderRadius: '0.5rem'
    }}>
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Thêm mới Lịch trình</Typography>
      </Grid>

      <Grid my={2} item xs={12}>
        <TextField
          fullWidth
          label="Thời gian Khởi hành"
          type="datetime-local"
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid my={2} item xs={12}>
        <TextField
          fullWidth
          label="Thời gian Đến nơi"
          type="datetime-local"
          value={arrivalTime}
          onChange={(e) => setArrivalTime(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid my={2} item xs={12}>
        <InputLabel id="bus-select-label">Select a bus</InputLabel>
        <Select
          labelId="bus-select-label"
          value={busId}
          onChange={handleBusChange}
          label="Select a bus"
          fullWidth
        >
          <MenuItem value="">
            <em>Select a bus</em>
          </MenuItem>
          {buses.map((bus) => (
            <MenuItem key={bus.id} value={bus.id}>
              {bus.licensePlate} - type: {bus.type} - capacity: {bus.capacity}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid my={2} item xs={12}>
        <InputLabel id="driver-select-label">Select a driver</InputLabel>
        <Select
          labelId="driver-select-label"
          value={driverId}
          onChange={handleDriverChange}
          label="Select a driver"
          fullWidth
        >
          <MenuItem value="">
            <em>Select a driver</em>
          </MenuItem>
          {drivers.map((driver) => (
            <MenuItem key={driver.id} value={driver.id}>
              {driver.name} - {driver.licenseNumber} - {driver.experience} years of experience
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid my={2} item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
          Tạo lịch trình
        </Button>
      </Grid>
    </Grid>
  </Box>
  );
};

export default AddScheduleForm;
