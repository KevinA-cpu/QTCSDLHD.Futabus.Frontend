import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const RouteDetailsComponent = ({ data }) => {
  if (!data) return null;

  // eslint-disable-next-line react/prop-types
  const { route, stops, schedules} = data;
  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', paddingTop: 2 }}>
        Route Details - {route.name}
      </Typography>

      <Grid container spacing={3}>
      <Grid item xs={12} px={3}>
        <Typography variant="subtitle1" px={1}>+<strong>Duration: </strong>{route.duration}, <strong>Distance:</strong> {route.distance} km</Typography>
      </Grid>
      <Grid item xs={12} p={3}>
        <Typography variant="h6" px={1}>Stops:</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Facilities</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stops.map((stop,index) => (
                <TableRow key={stop.id}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{stop.name}</TableCell>
                  <TableCell>{stop.location}</TableCell>
                  <TableCell>{stop.facilities}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} px={3} py={3}>
        <Typography variant="h6" px={1}>Schedules:
          <Button variant="outlined"
              sx={{
                marginLeft: 3,
              }}
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
                <TableCell>STT</TableCell>
                <TableCell>Departure Time</TableCell>
                <TableCell>Arrival Time</TableCell>
                <TableCell>price</TableCell>
                <TableCell>ticketType</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedules.map((schedule, index) => (
                <TableRow key={schedule.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{new Date(schedule.departureTime).toLocaleString()}</TableCell>
                  <TableCell>{new Date(schedule.arrivalTime).toLocaleString()}</TableCell>
                  <TableCell>{schedule.price}</TableCell>
                  <TableCell>{schedule.ticketType}</TableCell>
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
    </Grid>

    </TableContainer>
  );
};

export default RouteDetailsComponent;
