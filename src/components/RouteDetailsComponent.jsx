import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const RouteDetailsComponent = ({ data }) => {
  if (!data) return null;

  console.log(data);
  const { route, stops, schedules, buses, drivers } = data;
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
        <Typography variant="h6" px={1}>Schedules:
          <Button variant="outlined"
              component={Link}
              to={`schedules/add-new`}>
              Create
              <AddIcon  sx={{ marginLeft: '10px' }} />
          </Button>
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Departure Time</TableCell>
                <TableCell>Arrival Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedules.map(schedule => (
                <TableRow key={schedule.id}>
                  <TableCell>{new Date(schedule.departureTime).toLocaleString()}</TableCell>
                  <TableCell>{new Date(schedule.arrivalTime).toLocaleString()}</TableCell>
                  <TableCell>{schedule.status}</TableCell>
                  <TableCell style={{ width: '15%' }}>
                      <Button
                        variant="outlined"
                        component={Link}
                        to={`/futabus-routes/${route.id}/schedules/${schedule.id}`}
                        fullWidth
                      >
                        View Details
                      </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* <Grid item xs={12} px={3}>
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
              {buses.map(bus => (
                <TableRow key={bus.id}>
                  <TableCell>{bus.licensePlate}</TableCell>
                  <TableCell>{bus.type}</TableCell>
                  <TableCell>{bus.capacity}</TableCell>
                </TableRow>
              ))}
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
              {drivers.map(driver => (
                <TableRow key={driver.id}>
                  <TableCell>{driver.name}</TableCell>
                  <TableCell>{driver.licenseNumber}</TableCell>
                  <TableCell>{driver.experience}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid> */}
    </Grid>

    </TableContainer>
  );
};

export default RouteDetailsComponent;
