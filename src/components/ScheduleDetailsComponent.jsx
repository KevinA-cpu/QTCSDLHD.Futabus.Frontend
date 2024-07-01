import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Grid, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

const ScheduleDetailsComponent = ({ data }) => {
  if (!data) return null;
  const { scheduleId } = useParams();
  const { route, stops, schedules, buses, drivers } = data;
  const scheduleIndex = schedules.findIndex(schedule => schedule.id === scheduleId);
  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', paddingTop: 2 }}>
        Route Details - {route.name}
      </Typography>

      <Grid container spacing={3}>
      <Grid item xs={12} px={3}>
        <Typography variant="subtitle1" px={4}> Duration: {route.duration}, Distance: {route.distance} km</Typography>
      </Grid>
      <Grid item xs={12} px={3}>
        <Typography variant="h6" px={1}>Stops:</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stops.map(stop => (
                <TableRow key={stop.id}>
                  <TableCell>{stop.name}</TableCell>
                  <TableCell>{stop.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} px={3}>
        <Typography variant="h6" px={1}>Buses:</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>License Plate</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Capacity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={buses[scheduleIndex].id}>
                <TableCell>{buses[scheduleIndex].licensePlate}</TableCell>
                <TableCell>{buses[scheduleIndex].type}</TableCell>
                <TableCell>{buses[scheduleIndex].capacity}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} px={3}>
        <Typography variant="h6" px={1}>Drivers:</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>License Number</TableCell>
                <TableCell>Experience (years)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow key={drivers[scheduleIndex].id}>
                  <TableCell>{drivers[scheduleIndex].name}</TableCell>
                  <TableCell>{drivers[scheduleIndex].licenseNumber}</TableCell>
                  <TableCell>{drivers[scheduleIndex].experience}</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>

    </TableContainer>
  );
};

export default ScheduleDetailsComponent;
