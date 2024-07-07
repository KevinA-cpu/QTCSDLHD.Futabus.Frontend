import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Grid, Button, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Stepper, Step, StepLabel, StepContent } from '@mui/material';
import dayjs from 'dayjs';

const ScheduleDetailsComponent = ({ data }) => {
  if (!data) return null;
  const { scheduleId } = useParams();
  const { route, stops, schedules, buses, drivers } = data;
  const scheduleIndex = schedules.findIndex(schedule => schedule.id === scheduleId);


  const today = dayjs();
  let activeStep = 0;

  console.log(dayjs(schedules[scheduleIndex].arrivalTime) < today);
  console.log(dayjs(schedules[scheduleIndex].departureTime) > today && dayjs(schedules[scheduleIndex].arrivalTime) <= today);


  // Đã hết thúc
  if(dayjs(schedules[scheduleIndex].arrivalTime) < today)
  {
    activeStep = stops.length;
  }

  // Đang tham gia
  if(dayjs(schedules[scheduleIndex].departureTime) > today && today <= dayjs(schedules[scheduleIndex].arrivalTime))
  {
    activeStep = Math.floor(Math.random() * (stops.length-1)) + 0;
  }

  // chưa bắt đầu
  if(dayjs(schedules[scheduleIndex].departureTime) > today)
  {
    activeStep = -1;
  }

  console.log(activeStep)
  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', paddingTop: 2 }}>
        Schedule Details - {route.name}
      </Typography>

      <Grid container spacing={3} sx={{
        marginBottom: 3,
        paddingTop: 3,
        paddingLeft: 3
      }}>
        <Grid item xs={12} px={3}>
          <Typography variant="subtitle1" px={1}>+<strong>Duration: </strong>{route.duration}, <strong>Distance:</strong> {route.distance} km</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} px={3}>
          <Typography variant="h6" px={1}>Stops:</Typography>
          <Container>
          {activeStep == -1 && (
            <Stepper activeStep={1} orientation="vertical" sx={{paddingTop: 2, paddingBottom: 2}}>
                <Step key={-1} >
                  <StepLabel>Not yet start</StepLabel>
                </Step>
            </Stepper>
            )}

            <Stepper activeStep={activeStep} orientation="vertical">
            {stops.map((stop, index) => (
              <Step key={stop.id} completed={dayjs(stop.arrivalTime).isBefore(today)}>
                <StepLabel>{stop.name}, location: ({stop.location})</StepLabel>
                <StepContent>
                  <div>
                    <p>Location: {stop.location}</p>
                    <p>Facilities: {stop.facilities}</p>
                    <p>Arrival Time: {dayjs(stop.arrivalTime).format('YYYY-MM-DD HH:mm')}</p>
                  </div>
                </StepContent>
              </Step>
            ))}
            </Stepper>
            {activeStep === stops.length && (
              <Stepper activeStep={activeStep} orientation="vertical" sx={{paddingTop: 2}}>
                <Step key={923092} >
                  <StepLabel>Completed</StepLabel>
                </Step>
            </Stepper>
            )}
          </Container>

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
                  <TableCell>year of manufacture</TableCell>
                  <TableCell>Services</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={buses[scheduleIndex].id}>
                  <TableCell>{buses[scheduleIndex].licensePlate}</TableCell>
                  <TableCell>{buses[scheduleIndex].type}</TableCell>
                  <TableCell>{buses[scheduleIndex].capacity}</TableCell>
                  <TableCell>{buses[scheduleIndex].year}</TableCell>
                  <TableCell>{buses[scheduleIndex].services}</TableCell>
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
                  <TableCell>Completed Training</TableCell>
                  <TableCell>violations</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow key={drivers[scheduleIndex].id}>
                    <TableCell>{drivers[scheduleIndex].name}</TableCell>
                    <TableCell>{drivers[scheduleIndex].licenseNumber}</TableCell>
                    <TableCell>{drivers[scheduleIndex].experience}</TableCell>
                    <TableCell>{drivers[scheduleIndex].training}</TableCell>
                    <TableCell>{drivers[scheduleIndex].violations}</TableCell>
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
