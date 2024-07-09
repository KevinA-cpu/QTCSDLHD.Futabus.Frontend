import { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, MenuItem, Select, InputLabel, Paper } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const AddScheduleForm = () => {
  const navigate = useNavigate();
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [busId, setBusId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [price, setPrice] = useState(0);
  const [ticketType, setTicketType] = useState('');
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

  const handleTiketTypeChange = (event) => {
    setTicketType(event.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Đã submit:', { routeId, departureTime, arrivalTime, busId, driverId, price, ticketType });
      const res = await axios.post('https://localhost:7076/api/route/add-new-schedule', { routeId, busId, driverId, departureTime, arrivalTime, price, ticketType });
      alert(res.data);
      navigate(`/futabus-routes/${routeId}`);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <Paper elevation={1}>
    <Grid container spacing={2} p={5} marginBottom={2}>
      <Grid item xs={12}>
        <Typography variant="h5" align='center'>Thêm mới Lịch trình</Typography>
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
        <TextField
          fullWidth
          label="Giá vé (VNĐ)"
          type="number"
          value={price}
          inputProps={{ min: 0, step: 100 }}
          onChange={(e) => setPrice(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid my={2} item xs={12}>
        <InputLabel id="select-ticket-type">Loại vé</InputLabel>
        <Select
          labelId="select-ticket-type"
          fullWidth
          value={ticketType}
          onChange={handleTiketTypeChange}
        >
          <MenuItem value="">
            <em>Select ticket type</em>
          </MenuItem>
          {["Regular", "VIP"].map((type, index) => (
            <MenuItem key={index} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid my={2} item xs={12}>
        <InputLabel id="bus-select-label">Select a bus</InputLabel>
        <Select
          labelId="bus-select-label"
          value={busId}
          onChange={handleBusChange}
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
    </Paper>
  );
};

export default AddScheduleForm;
